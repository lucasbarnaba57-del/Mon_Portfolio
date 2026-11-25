import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const htmlFiles=[];
async function walk(dir){
 for(const entry of await readdir(dir,{withFileTypes:true})){
  if(entry.name.startsWith('.')||entry.name==='node_modules') continue;
  const full=resolve(dir,entry.name);
  if(entry.isDirectory()) await walk(full);
  else if(entry.name.endsWith('.html')) htmlFiles.push(full);
 }
}
await walk(root);
const errors=[];
const contents=new Map(await Promise.all(htmlFiles.map(async f=>[f,await readFile(f,'utf8')])));
const seenLinks=new Set();
const idsByFile=new Map([...contents].map(([file,text])=>[file,new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
function fail(file,message){errors.push(relative(root,file)+': '+message);}
for(const [file,text] of contents){
 if(!/^<!DOCTYPE html>/i.test(text)) fail(file,'doctype HTML5 absent');
 if(!/<html lang="fr">/.test(text)) fail(file,'langue absente');
 if((text.match(/<h1(?:\s|>)/g)||[]).length!==1) fail(file,'un seul h1 est attendu');
 if((text.match(/<main(?:\s|>)/g)||[]).length!==1||(text.match(/<\/main>/g)||[]).length!==1) fail(file,'structure main invalide');
 if((text.match(/<\/html>/g)||[]).length!==1||(text.match(/<\/body>/g)||[]).length!==1) fail(file,'fermetures du document invalides');
 if(!/name="description" content="[^"]+"/.test(text)) fail(file,'description absente');
 if(!/class="skip-link" href="#contenu"/.test(text)) fail(file,'lien d’évitement absent');
 const currentLinks=(text.match(/aria-current="page"/g)||[]).length;
 if(!file.endsWith('mentions-legales.html')&&currentLinks!==1) fail(file,'navigation courante absente ou ambiguë');
 const ids=[...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length) fail(file,'identifiant dupliqué');
 for(const match of text.matchAll(/<img\b[^>]*>/g)){
  if(!/\balt="[^"]*"/.test(match[0])) fail(file,'texte alternatif manquant');
 }
 if(/(?:file:\/\/|P:\/|href="#")/i.test(text)) fail(file,'lien local ou lien vide');
 if(/mots de passe chiffrés/i.test(text)&&!text.includes('était imprécis')) fail(file,'affirmation de sécurité non étayée');
 for(const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const raw=match[1].replace(/&amp;/g,'&');
  if(/^(?:https?:|mailto:|tel:|data:)/i.test(raw)) continue;
  if(/^[a-z]+:/i.test(raw)){fail(file,'protocole non autorisé : '+raw);continue;}
  let uri;try{uri=decodeURIComponent(raw);}catch{fail(file,'URI invalide : '+raw);continue;}
  const [route,hash]=uri.split('#');
  const clean=route.split('?')[0];
  const target=clean?resolve(dirname(file),clean):file;
  const rel=relative(root,target);
  if(rel.startsWith('..'+sep)||rel==='..'){fail(file,'chemin sortant du projet : '+raw);continue;}
  seenLinks.add(target);
  try{if(!(await stat(target)).isFile()) throw new Error('pas un fichier');}
  catch{fail(file,'ressource absente : '+raw);continue;}
  if(hash&&target.endsWith('.html')&&!idsByFile.get(target)?.has(hash)) fail(file,'ancre absente : '+raw);
 }
}
const data=JSON.parse(await readFile(resolve(root,'data/portfolio.json'),'utf8'));
const sources=JSON.parse(await readFile(resolve(root,'data/veille.json'),'utf8'));
if(data.competences.length!==6) errors.push('Le bloc support doit comporter six domaines.');
const expected=['B1.1','B1.2','B1.3','B1.4','B1.5','B1.6'];
if(expected.some(id=>!data.competences.some(c=>c.id===id))) errors.push('Repères de compétence incohérents.');
const missingIds=new Set(data.missing.map(m=>m.id));
for(const p of data.projects){
 if(!p.tests.length||!p.tasks.length||!p.analysis.length||!p.retrospective) errors.push('Fiche insuffisante : '+p.id);
 for(const id of p.missing) if(!missingIds.has(id)) errors.push('Pièce non référencée : '+id);
 for(const [id] of p.mapping) if(!expected.includes(id)) errors.push('Compétence inconnue : '+id);
}
for(const s of sources){
 if(!s.author||!s.summary||!s.limit||!s.analysis||!s.application||!s.action) errors.push('Fiche de veille incomplète : '+s.id);
 if(s.date>data.updated) errors.push('Source postérieure à la collecte : '+s.id);
 if(!new URL(s.url).protocol.startsWith('https')) errors.push('Source non HTTPS : '+s.id);
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(JSON.stringify({resultat:'OK',pages:htmlFiles.length,ressourcesLiees:seenLinks.size,domaines:6,projets:data.projects.length,sources:sources.length,limite:'Contrôles statiques locaux uniquement ; essais applicatifs consignés séparément.'},null,2));
