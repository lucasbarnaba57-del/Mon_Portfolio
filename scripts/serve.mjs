import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {dirname,resolve,relative,sep,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','.csv':'text/csv; charset=utf-8','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.sql':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end('Méthode non autorisée');return;}
 let urlPath;try{urlPath=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end('Adresse invalide');return;}
 if(urlPath.includes('\\')||urlPath.split('/').some(p=>p.startsWith('.'))){res.writeHead(403);res.end('Accès refusé');return;}
 const file=resolve(root,'.'+(urlPath==='/'?'/index.html':urlPath));
 const rel=relative(root,file);
 if(rel==='..'||rel.startsWith('..'+sep)){res.writeHead(403);res.end('Accès refusé');return;}
 try{if(!(await stat(file)).isFile())throw new Error();const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Content-Length':bytes.length,'X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:bytes);}
 catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Fichier introuvable');}
});
server.listen(port,'127.0.0.1',()=>console.log('Portfolio : http://127.0.0.1:'+port));
