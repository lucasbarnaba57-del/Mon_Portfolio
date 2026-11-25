import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await readFile(resolve(root, 'data/portfolio.json'), 'utf8'));
const sources = JSON.parse(await readFile(resolve(root, 'data/veille.json'), 'utf8'));
const sourceEvidence = JSON.parse(await readFile(resolve(root, 'data/evidence.json'), 'utf8'));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const dateFR = iso => new Intl.DateTimeFormat('fr-FR', {day:'numeric', month:'long', year:'numeric', timeZone:'UTC'}).format(new Date(iso+'T12:00:00Z'));
const updated = dateFR(data.updated);
const nav = [
 ['index.html','Accueil'],['qui-suis-je.html','Profil & CV'],['parcours.html','Parcours'],
 ['projet.html','Projet professionnel'],['certifications.html','Certifications'],['realisations.html','Réalisations'],['competences.html','Compétences'],
 ['veille.html','Veille technologique'],['veille-juridique.html','Veille juridique'],['documents.html','Documents'],['contact.html','Contact']
];
const pages = new Map();
const pills = items => '<div class="pills">'+items.map(x=>'<span class="pill">'+esc(x)+'</span>').join('')+'</div>';
const note = (title, body, variant='') => '<aside class="note '+variant+'"><strong>'+title+'</strong><p>'+body+'</p></aside>';
const section = (id,title,body,aside='') => '<section class="section anchor-section" id="'+id+'"><div class="section-head"><h2>'+title+'</h2>'+aside+'</div>'+body+'</section>';
const table = (caption,headers,rows,cls='') => '<div class="table-wrap"><table class="'+cls+'"><caption>'+caption+'</caption><thead><tr>'+headers.map(h=>'<th scope="col">'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map((v,i)=>(i===0?'<th scope="row">':'<td>')+v+(i===0?'</th>':'</td>')).join('')+'</tr>').join('')+'</tbody></table></div>';
function layout(file,title,description,body,current=file){
 if(file==='cv.html') current='qui-suis-je.html';
 const prefix=file.includes('/')?'../':'';
 return '<!DOCTYPE html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="'+esc(description)+'">\n<meta name="color-scheme" content="light">\n<title>'+esc(title)+' | Lucas Barnaba · BTS SIO SLAM</title>\n<link rel="icon" href="'+prefix+'assets/favicon.svg" type="image/svg+xml">\n<link rel="stylesheet" href="'+prefix+'style.css">\n<script src="'+prefix+'assets/app.js" defer></script>\n</head>\n<body>\n<a class="skip-link" href="#contenu">Aller au contenu</a>\n<div class="shell">\n<aside class="sidebar"><a class="brand" href="'+prefix+'index.html" aria-label="Lucas Barnaba, accueil"><span class="brand-name">Lucas Barnaba<small>PORTFOLIO · BTS SIO SLAM</small></span></a>\n<nav aria-label="Navigation principale"><ul class="nav-list">'+nav.map(([url,label])=>'<li><a href="'+prefix+url+'"'+(url===current?' aria-current="page"':'')+'>'+label+'</a></li>').join('')+'</ul></nav><div class="sidebar-bottom">Étudiant · deuxième année<p>Développement web & applications<br>Évry-Courcouronnes · Île-de-France</p><p><a href="'+esc(data.repository)+'">Consulter le dépôt GitHub</a></p></div></aside>\n<div class="workspace"><div class="topbar"><strong>Solutions logicielles & applications métiers</strong><span>Mis à jour le <time datetime="'+data.updated+'">'+updated+'</time></span></div>\n<main id="contenu" class="page" tabindex="-1">'+body+'</main>\n<footer class="footer"><span>© 2026 Lucas Barnaba · Portfolio de formation</span></footer></div></div>\n</body>\n</html>\n';
}
function hero(eyebrow,title,lead,extra='',portrait=false){
 return '<header class="hero'+(portrait?' hero-with-portrait':'')+'"><div><span class="eyebrow">'+eyebrow+'</span><h1>'+title+'</h1><p class="lead">'+lead+'</p>'+extra+'</div>'+(portrait?'<figure class="portrait"><img src="assets/portrait-lucas.png" width="363" height="439" alt="Portrait de Lucas Barnaba, extrait de son CV"><figcaption>Lucas Barnaba · BTS SIO SLAM</figcaption></figure>':'')+'</header>';
}
function projectCard(p){
 const preview = {"auto-ecole":"auto-formules-desktop.png","elegance-pluvieuse":"marchand-panier-local.png","epi-solidaire":"epi-stock-local.png"}[p.id];
 return '<article class="card project-card" data-category="'+esc(p.type)+'"><div class="project-visual '+p.id+'" aria-hidden="true">'+(preview ? '<img src="assets/projets/'+preview+'" alt="" loading="lazy">' : '')+'<span class="project-type">'+p.type+'</span></div><div class="project-card-body"><span class="card-label">'+esc(p.period)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p>'+pills(p.technologies)+'<a class="card-link" href="projets/'+p.id+'.html">Lire la fiche '+esc(p.title)+' <span aria-hidden="true">↗</span></a></div></article>';
}
function filters(listId, labels, noun){
 return '<div class="filter-bar" data-filter-group data-target="'+listId+'" data-noun="'+noun+'" hidden>'+['Tous',...labels].map((x,i)=>'<button type="button" data-filter="'+(i===0?'all':esc(x))+'" aria-pressed="'+(i===0?'true':'false')+'" aria-controls="'+listId+'">'+x+'</button>').join('')+'<span class="result-count" role="status" aria-live="polite" aria-atomic="true"></span></div>';
}
function missingLink(id,prefix=''){const item=data.missing.find(m=>m.id===id);return '<a href="'+prefix+'documents.html#'+id+'">'+esc(item.label)+'</a>';}
function sourceCard(s){
 return '<article class="source-card anchor-section" id="'+s.id+'" data-category="'+esc(s.category)+'"><div class="source-meta"><span>'+esc(s.publisher)+' · '+esc(s.kind)+'</span><time datetime="'+s.date+'">'+esc(s.dateLabel)+'</time></div><h3>'+esc(s.title)+'</h3><p class="top-space"><strong>Publication d’origine :</strong> '+esc(s.originalTitle)+'<br><strong>Auteur :</strong> '+esc(s.author)+'</p><div class="source-grid"><div><h4>Ce que dit la source</h4><p>'+esc(s.summary)+'</p><h4>Limites à garder en tête</h4><p>'+esc(s.limit)+'</p></div><div><h4>Interprétation</h4><p>'+esc(s.analysis)+'</p><h4>Lien avec mes projets</h4><p>'+esc(s.application)+'</p></div></div><p class="top-space"><strong>État de l’application :</strong> '+esc(s.action)+'</p><a class="source-link" href="'+esc(s.url)+'">Lire la publication originale sur '+esc(s.publisher)+'</a>'+(s.extraUrl?'<a class="source-link" href="'+esc(s.extraUrl)+'">Consulter les catégories de l’édition 2026</a>':'')+'</article>';
}

pages.set('index.html',layout('index.html','Accueil','Portfolio de Lucas Barnaba, étudiant en deuxième année de BTS SIO SLAM : parcours, projets, compétences et veille.',hero('Portfolio de BTS SIO','Lucas Barnaba','Je suis en deuxième année de BTS SIO, option SLAM. Pendant mon stage, j’ai travaillé sur la présentation des formations d’une auto-école. En atelier, j’ai aussi participé à un projet de boutique de parapluies.','<div class="actions"><a class="button" href="realisations.html">Voir mes réalisations <span aria-hidden="true">↗</span></a><a class="button secondary" href="competences.html">Mes compétences</a></div>',true)+
section('selection','Mes projets','<div class="grid two">'+data.projects.slice(0,2).map(projectCard).join('')+'</div>','<a class="text-link" href="realisations.html">Toutes les fiches</a>')+
section('orientation','Construire la suite','<div class="grid two"><div class="home-feature"><span class="eyebrow">Projet professionnel</span><h3>Consolider le développement, explorer l’IA.</h3><p>Mon objectif est de poursuivre mes études, si possible en alternance, pour développer des applications fiables avant d’envisager une spécialisation liée à l’intelligence artificielle.</p><a class="card-link" href="projet.html">Découvrir mon projet</a></div><article class="card"><span class="card-label">Veille technologique & données personnelles</span><h3>Que change l’IA pour un développeur ?</h3><p>Qualité du code, limites des études de productivité et protection des données : une base sourcée à relire, discuter et prolonger personnellement.</p><a class="card-link" href="veille.html">Parcourir la veille</a></article></div>')));

pages.set('qui-suis-je.html',layout('qui-suis-je.html','Profil et CV','Présentation de Lucas Barnaba, CV de développement, compétences déclarées et contacts professionnels.',hero('Profil & identité professionnelle',"Qui je suis",'Je m’appelle Lucas Barnaba. Je suis né à Metz et je suis étudiant en deuxième année de BTS SIO SLAM en région parisienne. Je m’intéresse au développement web, aux bases de données et aux applications métier.','',true)+
section('presentation','Ce que je souhaite développer','<div class="grid two"><article class="card"><h3>Comprendre toute la chaîne</h3><p>Mon parcours de formation aborde l’interface HTML/CSS, les interactions JavaScript, le traitement serveur en PHP, les données SQL et la programmation Java. Les fiches précisent ce qui est décrit et ce qui reste à démontrer.</p><p>Je souhaite progresser dans la conception, les tests et l’explication de mes choix techniques, pour aller au-delà d’un résultat seulement visuel.</p></article><article class="card"><h3>Relier technique et service</h3><p>Mes expériences en logistique, en restauration et en vente m’ont confronté à des procédures, au travail en équipe et à la relation avec les clients.</p><p>Ces expériences complètent mon parcours ; elles ne sont pas présentées comme des réalisations informatiques ni comme des preuves des compétences techniques du BTS.</p></article></div>')+
section('cv','Un CV orienté développement','<div class="card"><span class="card-label">PDF · version publique · une page</span><h3>Lucas Barnaba — étudiant développeur</h3><div class="actions top-space"><a class="button" href="cv/CV_Lucas_Barnaba_Developpement.pdf" download>Télécharger le CV PDF</a><a class="text-link" href="cv.html">Lire le CV en version web</a></div></div>')+
section('techniques','Des technologies reliées à des réalisations',table('Inventaire des pratiques déclarées, sans pourcentage de maîtrise',['Domaine','Usage décrit','Où examiner les éléments'],[
['HTML & CSS','Structuration de pages, charte graphique et adaptation aux écrans.','<a href="projets/auto-ecole.html">Page Formules</a> · <a href="projets/portfolio.html">Portfolio</a>'],
['JavaScript','Interaction par onglets annoncée dans le stage ; filtres disponibles dans le portfolio.','<a href="projets/auto-ecole.html">Projet de stage</a> · <a href="assets/app.js">Script du portfolio</a>'],
['PHP & MySQL','Comptes, sessions, catalogue et panier observés dans les sources ; contribution individuelle à confirmer.','<a href="projets/elegance-pluvieuse.html">Élégance Pluvieuse</a>'],
['Java','Bases de programmation étudiées en cours.','—'],
['GitHub, VS Code, WampServer, phpMyAdmin','Outils mentionnés dans le parcours ; environnement et versions à préciser par projet.','<a href="competences.html">Matrice de compétences</a>']
]))+
section('activites','En dehors des projets','<div class="grid two"><article class="card"><h3>Musculation</h3><p>Une pratique régulière qui demande discipline et constance.</p></article><article class="card"><h3>Course à pied</h3><p>Des sorties de 10 km et plus, avec des objectifs de progression personnels.</p></article></div>')));

pages.set('parcours.html',layout('parcours.html','Parcours','Formation, stage et expériences de Lucas Barnaba, étudiant en BTS SIO option SLAM.',hero('Formation & expériences',"Mon parcours","Du bac STMG au BTS SIO, voici ma formation, mon stage et mes expériences professionnelles.")+
section('formation','Ma formation','<div class="timeline"><article class="timeline-item"><span class="timeline-date">2025 → 2027</span><div><h3>BTS SIO · option SLAM</h3><p>Deuxième année au lycée du Parc des Loges à Évry-Courcouronnes.</p><a href="competences.html" class="card-link">Consulter les liens avec le référentiel</a></div></article><article class="timeline-item"><span class="timeline-date">2025</span><div><h3>Baccalauréat STMG · spécialité SIG</h3><p>Lycée Parc des Loges, Évry-Courcouronnes. Une première approche des organisations et des systèmes d’information, prolongée par les réalisations de développement du BTS.</p></div></article></div>')+
section('stage','Une expérience de stage identifiée','<article class="card"><span class="card-label">18 mai au 27 juin 2026 · Ris-Orangis</span><h3>Auto École Excellence</h3><p>Stage de première année : site vitrine réalisé en binôme. Ma contribution déclarée est la page « Formules », en HTML, CSS et JavaScript, pour présenter les formations et les tarifs en respectant la charte du site.</p><p>Le résultat est annoncé comme un prototype présenté à l’auto-école. Les sources et les essais de cette version sont désormais consultables ; la contribution individuelle et le retour du tuteur restent à joindre.</p><a class="card-link" href="projets/auto-ecole.html">Examiner le périmètre, les tests et les pièces attendues</a></article>')+
section('experience','Mes autres expériences professionnelles',table('Informations reprises du CV présent dans le dépôt initial',['Période','Expérience','Apports transférables'],[
['Sept. 2025 – fév. 2026','Équipier polyvalent · Chronodrive, Évry-Courcouronnes','Préparation de commandes, gestion des stocks surgelés, respect de la chaîne du froid et accueil des clients.'],
['Juil. – août 2025','Serveur · Andiamo','Prise de commandes, encaissement, service et entretien de la salle.'],
['Sept. 2024 – mars 2025','Vendeur · Boulangerie','Conseil, encaissement, réassort et respect des règles d’hygiène.'],
['Janv. – nov. 2023','Baby-sitter · Particuliers','Respect des consignes, organisation des activités et accompagnement des devoirs.']
]))));

pages.set('projet.html',layout('projet.html','Projet professionnel','Objectifs de poursuite d’études et progression vers le développement d’applications et l’intelligence artificielle.',hero('Projet professionnel',"Après le BTS",'Après le BTS SIO, je souhaite poursuivre mes études, de préférence en alternance. Je m’intéresse à l’intégration de l’intelligence artificielle dans des applications et aux conditions de leur déploiement fiable.')+
section('cap','Un objectif progressif','<div class="grid three"><article class="card"><span class="step-no">À COURT TERME</span><h3>Devenir plus autonome</h3><p>Expliquer mon code, modéliser les données, contrôler les accès et tester les comportements d’une application. Présenter des projets exécutables et documentés.</p></article><article class="card"><span class="step-no">APRÈS LE BTS</span><h3>Approfondir la formation</h3><p>Étudier une poursuite en informatique de niveau bac+3, avec une place importante pour les projets et l’expérience en entreprise. Les formations et conditions d’admission sont à vérifier avant toute candidature.</p></article><article class="card"><span class="step-no">À PLUS LONG TERME</span><h3>Explorer les usages de l’IA</h3><p>Comprendre comment intégrer et évaluer un service d’IA dans une application, puis déterminer si une spécialisation plus avancée correspond à mon niveau et à mes intérêts.</p></article></div>')+
section('pistes','Deux pistes à explorer',table('Pistes de métier étudiées, sans expérience revendiquée dans ces fonctions',['Piste','Ce que je veux comprendre','Première étape de progression'],[
['Développement et intégration de services d’IA','Articuler API, besoins métier, évaluation des réponses, confidentialité et erreurs.','Concevoir un petit prototype sur données fictives avec critères de réussite explicites. Ce prototype n’est pas encore présenté comme réalisé.'],
['Déploiement et exploitation d’applications ou de modèles','Comprendre la reproductibilité, les versions, les contrôles avant publication et le suivi du service.','Documenter d’abord le déploiement d’une application existante, puis vérifier son fonctionnement depuis un autre poste.']
]))+
section('plan','Un plan d’apprentissage à mettre en pratique',table('Objectifs proposés : les résultats ne sont pas présumés acquis',['Priorité','Action','Résultat à produire'],[
['1 · Applications existantes','Remettre le site marchand en état d’installation et retrouver ma contribution.','Dépôt identifié, export de données fictives, guide local et démonstration.'],
['2 · Qualité et sécurité','Vérifier les règles du panier, les sessions, les requêtes et les droits.','Rapport de tests avec résultats observés et correction d’au moins une anomalie réelle si elle est rencontrée.'],
['3 · Méthode','Tracer les tâches, les difficultés et les décisions.','Planning réel, contributions et bilan expliquant les écarts.'],
['4 · IA et formation','Relire les sources, expérimenter sur une petite tâche et comparer les parcours d’études.','Journal personnel daté et critères de choix argumentés.']
]))+
section('veille-lien','Une veille qui aide à décider',note('Une question de méthode.','La veille pose une question concrète : <strong>comment utiliser une assistance IA sans perdre la compréhension, la qualité et la confidentialité du code ?</strong> Les sources proposées confrontent des méthodes d’évaluation et des recommandations de sécurité. <a href="veille.html">Consulter les fiches de veille</a>.'))));

pages.set('realisations.html',layout('realisations.html','Réalisations','Fiches des projets de stage, d’atelier et de TP : besoin, contribution, technique, tests et preuves.',hero('Réalisations & analyse technique',"Mes réalisations","Mon stage, mes projets de formation et les fichiers qui permettent de les découvrir.")+
filters('liste-projets',['Stage','Atelier','Projet pédagogique','TP','Personnel'],'réalisation')+
'<div id="liste-projets" class="grid two">'+data.projects.map(projectCard).join('')+'</div>'));

for (const p of data.projects) {
 const isPortfolio=p.id==='portfolio';
 const hasEvidence=Boolean(sourceEvidence[p.id]);
 const evidence=isPortfolio?
 '<div class="document-list"><div class="document-row"><div><h3>Sources du portfolio</h3><p>Pages HTML, styles, JavaScript et scripts de génération.</p></div><a class="button secondary small" href="'+esc(data.repository)+'">Dépôt source</a></div><div class="document-row"><div><h3>Recette de cette version</h3><p>Contrôles exécutés et limites consignés dans un rapport distinct.</p></div><a class="button secondary small" href="../docs/RECETTE_PORTFOLIO.md">Lire le rapport</a></div><div class="document-row"><div><h3>Architecture et décisions</h3><p>Périmètre statique, dépendances et maintenance.</p></div><a class="button secondary small" href="../docs/ARCHITECTURE.md">Lire le document</a></div></div>':
 (hasEvidence?renderEvidence(p):note('Description disponible, preuves attendues.','La version originale de ce TP et les fiches alors réalisées restent à fournir. Les repères graphiques de l’index ne sont pas des captures de cette réalisation.','warning'));
 const testRows=p.tests.map(t=>[esc(t[1]),esc(t[2])]);
 const body='<p class="breadcrumb"><a href="../realisations.html">Réalisations</a> / '+esc(p.title)+'</p>'+
 hero(esc(p.type),esc(p.title),esc(p.subtitle),'<div class="pills">'+p.technologies.map(t=>'<span class="pill">'+esc(t)+'</span>').join('')+'</div>')+
 '<div class="project-intro"><div class="project-content"><h2>Le besoin à résoudre</h2><p class="top-space">'+esc(p.context)+'</p><h3>Problématique</h3><p>'+esc(p.problem)+'</p></div><aside class="card"><dl class="facts"><div><dt>Période</dt><dd>'+esc(p.period)+'</dd></div><div><dt>Équipe</dt><dd>'+esc(p.team)+'</dd></div><div><dt>Périmètre personnel</dt><dd>'+esc(p.scope)+'</dd></div><div><dt>Environnement</dt><dd>'+esc(isPortfolio?'Site statique · Node.js pour la génération':p.id==='site-veille'?'Navigateur · HTML/CSS':'Local · WampServer annoncé')+'</dd></div></dl></aside></div>'+
 '<ul class="project-toc" aria-label="Sommaire de la fiche"><li><a href="#contribution">Contribution</a></li><li><a href="#technique">Analyse technique</a></li><li><a href="#tests">Tests</a></li><li><a href="#competences">Compétences</a></li><li><a href="#preuves">Preuves</a></li></ul>'+
 section('contribution',isPortfolio?'Travail de refonte avec assistance IA':hasEvidence&&p.id!=='auto-ecole'?'Fonctions observées et contribution à préciser':'Mon travail','<div class="card"><ul class="compact-list">'+p.tasks.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>')+
 section('technique','Comprendre les choix techniques',table(hasEvidence?'Analyse des sources fournies, examinées le 25 novembre 2026':'Analyse à confronter aux fichiers réels ; aucune architecture absente n’est reconstituée comme une preuve',['Sujet','Lecture technique','État de vérification'],p.analysis.map(row=>row.map(esc)),'wide-table'))+
 section('securite','Qualité, sécurité et données','<div class="card"><p>'+esc(p.security)+'</p>'+
 (p.id==='elegance-pluvieuse'?'<p class="top-space subtle">Références de contrôle : <a href="https://www.php.net/manual/fr/function.password-hash.php">manuel PHP : hachage</a> · <a href="https://www.php.net/manual/fr/pdo.prepared-statements.php">manuel PHP : requêtes préparées</a>. Ces liens ne prouvent pas l’emploi de ces mécanismes dans le projet.</p>':'')+'</div>')+
 (hasEvidence?renderObservedTests(p):'')+
 section('tests','Scénarios de test proposés',
 (isPortfolio?'<p><a href="../docs/RECETTE_PORTFOLIO.md">Consulter les résultats du portfolio</a></p>':'')+
 '<div class="top-space">'+table('Scénarios de contrôle — données fictives et environnement local autorisé',['Action','Résultat attendu'],testRows,'wide-table')+'</div>')+
 section('resultat','Résultat et recul','<div class="grid two"><article class="card"><h3>État du livrable</h3><p>'+esc(p.outcome)+'</p></article><article class="card"><h3>Bilan et progression</h3><p>'+esc(p.retrospective)+'</p></article></div>')+
 section('competences','Liens avec les compétences du BTS',table('Exemples tirés de ce projet',['Compétence','Pourquoi ce lien ?'],p.mapping.map(([id,reason])=>['<a href="../competences.html#'+id.replace('.','-')+'">'+esc(data.competences.find(c=>c.id===id).title)+'</a>',esc(reason)]))+
 '<div class="card top-space"><h3>Éclairage SLAM</h3><ul class="compact-list top-space">'+p.slam.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>')+
 section('preuves','Fichiers et captures',evidence)+
 '<div class="actions section"><a class="button secondary" href="../realisations.html">Revenir aux réalisations</a><button class="print-action" type="button" data-print hidden>Imprimer cette fiche</button></div>';
 pages.set('projets/'+p.id+'.html',layout('projets/'+p.id+'.html',p.title,p.summary,body,'realisations.html'));
}

function renderEvidence(p){
 const e=sourceEvidence[p.id];
 const gallery=e.screenshots.length?'<div class="evidence-gallery">'+e.screenshots.map(img=>'<figure><a href="../'+esc(img.path)+'"><img src="../'+esc(img.path)+'" alt="'+esc(img.alt)+'" loading="lazy"></a><figcaption>'+esc(img.caption)+'</figcaption></figure>').join('')+'</div>':'';
 const schema=table('Structure observée dans le SQL fourni ; les noms et clés ne sont pas inventés',['Table','Clé primaire','Rôle / observation'],e.schema.map(r=>r.map(esc)));
 const snippets=e.snippets.map(x=>'<details class="top-space"><summary>'+esc(x.file)+' · lignes '+x.startLine+' à '+x.endLine+'</summary><div class="details-body"><p>Extrait du fichier transmis, examiné le 25 novembre 2026. Il ne démontre pas à lui seul la contribution du candidat.</p><pre><code>'+esc(x.code)+'</code></pre><a href="'+esc(x.url)+'">Retrouver le fichier fourni</a></div></details>').join('');
 return note('Sources examinées, attribution personnelle à confirmer.',esc(e.review)+' Les essais de cette refonte ne sont pas présentés comme des tests réalisés pendant le stage ou par le candidat.')+
 '<div class="actions top-space"><a class="button secondary" href="'+esc(e.folderUrl)+'">Dossier de sources fourni</a><a class="button secondary" href="../'+esc(e.schemaPath)+'">Structure SQL sans données</a></div><p class="hint">Vérifier les droits d’accès du jury avant l’évaluation. Les extraits et captures ci-dessous sont consultables dans le portfolio sans accès au dossier.</p>'+gallery+'<h3 class="top-space">Modèle de données observé</h3><div class="top-space">'+schema+'</div><h3 class="top-space">Extraits à savoir expliquer</h3>'+snippets;
}
function renderObservedTests(p){
 const e=sourceEvidence[p.id];
 const results=e.tests.map(t=>[esc(t.id),esc(t.test),esc(t.observed),t.passed?'Conforme au résultat attendu':'Anomalie observée']);
 return section('essais-observes','Essais locaux du 25 novembre 2026',note('Conditions de vérification.','Essais effectués avec assistance IA sous PHP 8.2.12 et MariaDB 10.4.32, dans une base isolée contenant uniquement des données fictives. Seules les connexions à la base ont été adaptées. La logique métier des fichiers reçus n’a pas été corrigée. Une vérification partielle ne constitue pas une recette d’acceptation.')+'<div class="top-space">'+table('Résultats observés sur la version transmise, sans masquer les échecs',['ID','Contrôle','Observation','Résultat'],results,'wide-table')+'</div><p class="hint"><a href="../docs/ANALYSE_SOURCES_PROJETS.md">Conditions, limites et priorités détaillées</a>.</p>');
}

const situations = {
  "B1.1": [
    "Je n’ai pas encore d’exemple personnel à présenter pour le suivi du matériel, des logiciels ou des habilitations.",
    ""
  ],
  "B1.2": [
    "Il me manque un exemple de demande que j’ai suivie, du signalement jusqu’à la vérification de la solution.",
    ""
  ],
  "B1.3": [
    "Pendant mon stage chez Auto École Excellence, j’ai travaillé sur la page Formules. Elle permet de consulter les formations et leurs tarifs.",
    "<a href=\"projets/auto-ecole.html#preuves\">Voir la page Formules</a>"
  ],
  "B1.4": [
    "Pour le site de l’auto-école, nous avons travaillé en binôme avec une charte commune. Ma partie concernait la présentation des formules.",
    "<a href=\"projets/auto-ecole.html#contribution\">Ma contribution au stage</a>"
  ],
  "B1.5": [
    "Mon portfolio est accessible sur GitHub Pages. Pour Épi Solidaire, les essais présentés portent sur une installation locale.",
    "<a href=\"projets/epi-solidaire.html#essais-observes\">Voir les essais sur Épi Solidaire</a>"
  ],
  "B1.6": [
    "Mon projet est de poursuivre mes études en développement. Mes attestations de l’Atelier RGPD et ma veille sur les assistants de code illustrent deux sujets que j’approfondis.",
    "<a href=\"certifications.html\">Mes formations</a> · <a href=\"veille.html\">Ma veille technologique</a>"
  ]
};
pages.set('competences.html',layout('competences.html','Mes compétences','Les compétences du BTS SIO illustrées par mon stage, mes projets et mes formations.',hero('BTS SIO · SLAM','Mes compétences','De la page Formules de l’auto-école aux essais sur Épi Solidaire, voici les situations que je peux présenter.')+
section('domaines','Les compétences du BTS SIO','<div class="grid two">'+data.competences.map(c=>{
 const [situation, lien] = situations[c.id];
 return '<article class="card anchor-section" id="'+c.id.replace('.','-')+'"><h3>'+esc(c.title)+'</h3><p>'+esc(situation)+'</p>'+(lien?'<p>'+lien+'</p>':'')+'</article>';
}).join('')+'</div>')+
section('references','Pour aller plus loin','<p><a href="docs/tableau-synthese-travail.csv">Mon tableau de synthèse de travail (CSV)</a> · <a href="https://www.reseaucerta.org/sites/default/files/sio/BTS_SIO_referentiel_Avril2019.pdf">Référentiel du BTS SIO (PDF)</a></p>')));

pages.set('veille.html',layout('veille.html','Veille technologique et données personnelles','Veille sourcée sur l’assistance IA au développement : productivité, qualité, sécurité et protection des données.',hero('Veille technologique & données personnelles',"Les assistants de code",'Comment les assistants d’IA peuvent-ils aider à développer sans dégrader la compréhension du code, la qualité du logiciel et la confidentialité des données ?')+
note('Sources et méthode','Cette sélection a été préparée avec une assistance IA le '+updated+'. Les essais proposés dans les fiches restent à réaliser.')+
section('methode','Une méthode à tenir dans la durée','<div class="grid three"><article class="card"><span class="step-no">1 · COLLECTER</span><h3>Des sources identifiées</h3><p>Privilégier les travaux des chercheurs, les publications de l’éditeur et les recommandations d’organismes reconnus. Relever la date et les mises à jour.</p></article><article class="card"><span class="step-no">2 · CONFRONTER</span><h3>Des limites explicites</h3><p>Comparer la population étudiée, la tâche, les critères et les intérêts de l’auteur. Distinguer un résultat expérimental d’une perception ou d’une recommandation.</p></article><article class="card"><span class="step-no">3 · EXPLOITER</span><h3>Une conséquence concrète</h3><p>Relier l’information à un choix, un test ou une précaution sur un projet. Conserver le résultat réel et les questions non résolues.</p></article></div><div class="card top-space"><h3>Organisation proposée pour la suite</h3><dl class="definition-list"><dt>Rythme visé</dt><dd>Une courte collecte par semaine, puis une synthèse personnelle mensuelle. Ce rythme est un objectif, pas un historique revendiqué.</dd><dt>Sources à suivre</dt><dd><a href="https://metr.org/research/">METR Research</a>, <a href="https://github.blog/news-insights/research/">GitHub Research</a>, <a href="https://genai.owasp.org/">OWASP GenAI</a> et <a href="https://www.cnil.fr/fr/ia-comment-se-mettre-en-conformite">CNIL : IA et conformité</a>.</dd><dt>Requêtes utiles</dt><dd>« AI coding productivity study », « AI code quality », « LLM application security », « IA développement données personnelles ».</dd><dt>Trace conservée</dt><dd>Date de publication, date de lecture personnelle, synthèse, limite, projet concerné, décision et résultat. Aucun abonnement ou outil de collecte non configuré n’est présenté comme utilisé.</dd></dl><a class="card-link" href="docs/journal-veille.csv" download>Télécharger le journal de veille à compléter au fil des lectures</a></div>')+
section('fiches','Cinq fiches technologiques',filters('liste-sources',['Productivité','Sécurité'],'fiche')+'<div id="liste-sources">'+sources.filter(s=>s.category!=='Données personnelles').map(sourceCard).join('')+'</div>')+
section('juridique-lien','Poursuivre avec les données personnelles','<p>Deux fiches CNIL et leurs conséquences pour les projets sont regroupées dans <a href="veille-juridique.html">la veille juridique</a>.</p>')+
 section('synthese','Ce que la confrontation des sources permet de proposer',table('Synthèse documentaire à relire et à reformuler personnellement',['Question','Lecture proposée','Action possible sur les projets'],[
['L’IA rend-elle toujours plus rapide ?','Les études diffèrent par leur contexte et leur mesure ; les résultats de 2025 ne se généralisent pas automatiquement aux outils de 2026.','Mesurer une tâche comparable, en incluant compréhension, revue, corrections et tests.'],
['Un résultat qui fonctionne est-il suffisant ?','La qualité concerne aussi les contrôles serveur, les droits, la maintenance et les effets inattendus.','Exécuter le plan de tests du site marchand et expliquer chaque contrôle de sécurité.'],
['Que peut-on transmettre à un assistant ?','Les données personnelles, secrets et informations du client demandent un examen préalable du contexte et des conditions de traitement.','Employer des comptes et données fictifs ; retirer les secrets des fichiers partagés.'],
['Quel usage personnel démontrer ?','La base actuelle reste une collecte assistée ; la compétence repose sur sa compréhension et son exploitation personnelle.','Documenter une lecture critique et un essai réellement effectué, avec sa vraie date et ses limites.']
]))));

const documentItems=[
 ['CV de développement','PDF public recentré sur le parcours informatique ; informations reprises des documents existants.','cv/CV_Lucas_Barnaba_Developpement.pdf','Ouvrir le PDF'],
 ['Tableau de synthèse de travail','XLSX préparatoire, distinct du modèle officiel ; contributions et états documentaires visibles.','docs/tableau-synthese-travail.xlsx','Ouvrir le XLSX'],
 ['Recette technique du portfolio','Contrôles exécutés sur cette version, résultats et limites.','docs/RECETTE_PORTFOLIO.md','Lire le rapport'],
 ['Architecture et décisions','Fonctionnement du site, maintenance, choix techniques et limites.','docs/ARCHITECTURE.md','Lire le document'],
 ['Audit et priorités','Constats initiaux, modifications et risques encore présents pour l’évaluation.','docs/AUDIT_PORTFOLIO.md','Lire l’audit'],
 ['Liste des éléments à fournir','Demandes précises et pièces attendues, regroupées par priorité et projet.','docs/A_FOURNIR.md','Lire la liste'],
 ['Attestations et formations complémentaires','Cinq attestations CNIL vérifiées ; preuves SecNumAcadémie et Cisco à compléter.','certifications.html','Voir les attestations'],
 ['Analyse des sources applicatives','Fichiers examinés, syntaxe PHP, essais sur données fictives et défauts ouverts.','docs/ANALYSE_SOURCES_PROJETS.md','Lire l’analyse'],
 ['Guide de publication et de reprise','Installation, génération, contrôles, vérification après mise en ligne et copie hors ligne.','README.md','Lire le guide']
];
pages.set('documents.html',layout('documents.html','Documents et preuves','Documents consultables, tableau de travail et registre précis des preuves manquantes pour chaque projet.',hero('Dossier documentaire',"Mes documents","Mon CV, mes attestations et les documents associés aux projets.")+
section('disponibles','Documents consultables','<div class="document-list">'+documentItems.map(([title,desc,url,label])=>'<div class="document-row"><div><h3>'+title+'</h3><p>'+desc+'</p></div><a class="button secondary small" href="'+url+'">'+label+'</a></div>').join('')+'</div>')+
section('registre','Pièces à réunir',
data.missing.map(item=>'<article class="card anchor-section top-space" id="'+item.id+'"><h3>'+esc(item.label)+'</h3><p class="top-space"><strong>À fournir :</strong> '+esc(item.need)+'</p></article>').join(''))));

pages.set('contact.html',layout('contact.html','Contact','Contacter Lucas Barnaba et accéder à son dépôt GitHub et à son CV de développement.',hero('Contact professionnel','Me contacter','Pour une question sur mes réalisations, mon parcours ou une possibilité de formation et d’expérience en développement.')+
'<div class="grid two"><section class="card"><span class="card-label">Par courrier électronique</span><h2>Me contacter</h2><p class="top-space"><a class="contact-address" href="mailto:'+esc(data.email)+'">'+esc(data.email)+'</a></p></section><section class="card"><span class="card-label">Code & parcours</span><h2>Retrouver mes supports</h2><p class="top-space"><a href="'+esc(data.repository)+'">Dépôt GitHub du portfolio</a></p><p><a href="cv/CV_Lucas_Barnaba_Developpement.pdf">CV au format PDF</a></p><p>Région parisienne · Évry-Courcouronnes.</p></section></div>'));

pages.set('mentions-legales.html',layout('mentions-legales.html','Informations de publication','Édition, contact, hébergement à confirmer, données et ressources de ce portfolio de formation.',hero('Édition & données','Informations<br>de publication.','Les informations ci-dessous décrivent cette version statique et signalent les données de publication encore à confirmer.')+
'<div class="prose"><h2>Édition et contact</h2><p>Portfolio de formation de Lucas Barnaba, étudiant en BTS SIO option SLAM. Contact : <a href="mailto:'+esc(data.email)+'">'+esc(data.email)+'</a>. L’adresse de contact provient du CV fourni et doit être confirmée avant publication.</p><h2>Hébergement public à confirmer</h2><p>Le code source est conservé dans <a href="'+esc(data.repository)+'">le dépôt GitHub du portfolio</a>. Cela ne permet pas d’affirmer où cette version du site sera publiée. Avant sa diffusion, compléter cette page avec l’identité et les coordonnées du fournisseur d’hébergement réellement choisi, ainsi que l’URL publique vérifiée. Cette information est suivie dans <a href="documents.html#PF-01">PF-01</a>.</p><h2>Données et fonctionnement</h2><p>Cette version ne comporte ni formulaire de collecte, ni mesure d’audience, ni police distante, ni script de suivi. Les filtres s’exécutent dans le navigateur, sans conserver de données dans un cookie ou un stockage local. Les liens externes et le lien de messagerie ouvrent des services tiers dont les traitements leur sont propres.</p><p>L’hébergeur peut traiter les informations de connexion nécessaires à son service. Les conditions applicables devront être précisées à partir du fournisseur retenu. L’absence de traceur ajouté dans le code ne signifie pas l’absence de tout traitement par l’hébergement.</p><h2>Sources, droits et documents</h2><p>Les publications de veille sont reliées à leur source et résumées. Leurs auteurs conservent leurs droits. Les captures des projets sont issues de l’exécution locale des fichiers transmis sur des données fictives, le 25 novembre 2026. Le portrait provient du CV personnel et les attestations CNIL sont les fichiers retrouvés dans la messagerie à la demande du candidat. Vérifier les autorisations de diffusion des ressources de tiers. Les documents publics doivent utiliser des données fictives ou anonymisées et ne contenir aucun secret.</p><h2>Assistance à la rédaction et au développement</h2><p>La refonte du '+updated+' utilise une assistance IA pour le code, la structuration et la préparation des analyses. Les descriptions des projets antérieurs proviennent du dépôt initial. Elles doivent être relues et justifiées par le candidat ; aucune expérience, capture, validation client ou réussite de test applicatif n’est inventée.</p><h2>Accessibilité</h2><p>Le site prévoit une navigation au clavier, un lien d’évitement, des titres structurés, des tableaux légendés et un contenu consultable sans JavaScript. Les vérifications réalisées figurent dans <a href="docs/RECETTE_PORTFOLIO.md">la recette technique</a>. Elles ne constituent pas un audit complet de conformité RGAA.</p></div>'));


pages.set('certifications.html',layout('certifications.html','Certifications et formations','Attestations CNIL vérifiées, dates et scores, et état des preuves pour SecNumAcadémie et Cisco.',hero('Formations complémentaires & attestations',"Mes formations complémentaires","J’ai regroupé ici mes attestations de l’Atelier RGPD et les informations disponibles sur mes formations ANSSI et Cisco.")+
section('cnil','Atelier RGPD · CNIL','<div class="grid two">'+data.certifications.map(c=>'<article class="card"><span class="card-label">CNIL · attestation de suivi · module '+c.module+'</span><h3>'+esc(c.title)+'</h3><p class="top-space"><time datetime="'+c.date+'">'+dateFR(c.date)+'</time> · Score : <strong>'+c.score+' %</strong></p><a class="card-link" href="'+esc(c.path)+'">Consulter l’attestation du module '+c.module+' · PDF</a></article>').join('')+'</div><div class="actions top-space"><a class="button secondary" href="docs/certifications/Atelier_RGPD_Attestations_Lucas_Barnaba.pdf" download>Télécharger les cinq attestations réunies</a></div>')+
section('complements','SecNumAcadémie et Cisco : preuves à compléter',table('Déclarations du candidat confrontées aux éléments retrouvés',['Formation','Élément vérifié','État à afficher'],[
['SecNumAcadémie · ANSSI','Courriel confirmant une inscription le 7 novembre 2025.','Réussite déclarée par le candidat ; attestation finale non retrouvée. Aucune date de réussite n’est inventée.'],
['Introduction à la cybersécurité · Cisco Networking Academy','Courriel d’inscription à ce cours daté du 6 février 2026.','Réussite déclarée par le candidat ; certificat ou badge à fournir. Le cours n’est pas assimilé à une certification Cisco CCNA.']
]))));

pages.set('veille-juridique.html',layout('veille-juridique.html','Veille juridique','Veille sur les données personnelles dans les projets et le développement assisté par IA, à partir de sources CNIL.',hero('Veille juridique · données personnelles',"Les données personnelles dans mes projets",'Question de veille : quelles précautions prendre lorsque des données personnelles interviennent dans un projet web ou dans le développement d’un système d’IA ?')+
note('Sources','Ces deux fiches ont été préparées avec une assistance IA à partir des publications de la CNIL.')+
section('sources-juridiques','Deux références de la CNIL',sources.filter(s=>s.category==='Données personnelles').map(sourceCard).join(''))+
section('consequences','Conséquences proposées pour mes réalisations',table('Pistes à vérifier dans le contexte réel ; aucune conformité globale revendiquée',['Projet','Données concernées','Point de vigilance'],[
['Auto École Excellence','Nom, courriel, téléphone et message de réservation.','Limiter l’accès aux rendez-vous, informer sur le traitement et définir la durée nécessaire avec le responsable du projet. Les captures de cette version utilisent des données fictives.'],
['Élégance Pluvieuse','Comptes clients et panier.','Éviter les exports de comptes réels et les secrets dans les pièces du portfolio ; documenter les rôles, les accès et les mécanismes réellement utilisés.'],
['Épi Solidaire','Habitants, foyers, acheteurs, employés et commandes.','Protéger les exports et les accès selon les rôles. Les données d’un contexte social demandent une vigilance particulière ; les lignes de données de l’export original ne sont pas republiées.'],
['Assistance au développement','Code, journaux, configurations et jeux d’essai.','Examiner les données transmises au service d’assistance, ses conditions et l’autorisation du responsable du projet avant tout usage de données personnelles.']
]))+
section('apprentissage','Un lien avec mes formations complémentaires','<div class="card"><h3>Atelier RGPD</h3><p>Cinq attestations CNIL sont consultables avec leurs dates et scores. Elles soutiennent l’apprentissage ; leur application doit être expliquée à partir des projets.</p><a class="card-link" href="certifications.html">Voir les attestations</a></div><p class="top-space"><a href="veille.html">Revenir à la veille technologique</a> · <a href="docs/journal-veille.csv" download>Journal de lectures personnelles</a></p>')));

pages.set('cv.html',layout('cv.html','CV en version web','CV accessible en HTML : formation, projets, compétences et attestations de Lucas Barnaba.',hero('CV · version web','Lucas Barnaba','Étudiant en deuxième année de BTS SIO, option Solutions logicielles et applications métiers. Développement web, bases de données et applications métier.','<div class="actions"><a class="button" href="cv/CV_Lucas_Barnaba_Developpement.pdf" download>CV PDF</a><a class="button secondary" href="contact.html">Contact</a></div>',true)+
section('formation','Formation','<div class="card"><h3>BTS SIO · option SLAM · en cours</h3><p>Deuxième année au lycée du Parc des Loges, Évry-Courcouronnes · session 2027. Conception d’interfaces, PHP, SQL, Java, support et cybersécurité appliquée.</p><h3 class="top-space">Baccalauréat STMG · 2025</h3><p>Lycée Parc des Loges, Évry-Courcouronnes ; spécialité SIG selon le portfolio initial.</p></div>')+
section('projets-cv','Projets de formation','<div class="grid two">'+data.projects.filter(p=>p.id!=='portfolio').map(projectCard).join('')+'</div>')+
section('pratiques','Pratiques et outils',table('Pratiques de formation à examiner dans les fiches',['Domaine','Éléments du parcours'],[
['Développement web','HTML, CSS, JavaScript ; PHP et PDO dans les dossiers applicatifs.'],
['Données','SQL / MySQL, jointures, contraintes et schémas des projets.'],
['Programmation','Bases de Java déclarées ; réalisation personnelle Java à joindre.'],
['Outils','VS Code, GitHub, WampServer et phpMyAdmin mentionnés dans le parcours.']
]))+
section('formations-complementaires','Formations complémentaires','<div class="card"><h3>Atelier RGPD · CNIL</h3><p>Cinq attestations de suivi vérifiées : modules 1, 3, 4, 5 et 6, de septembre à novembre 2025.</p><a class="card-link" href="certifications.html">Voir les dates, scores et justificatifs</a></div>')+
section('experience-cv','Autres expériences',table('Informations reprises du CV existant',['Période','Expérience'],[
['Septembre 2025 – février 2026','Équipier polyvalent · Chronodrive, Évry-Courcouronnes. Préparation de commandes, stocks surgelés et accueil client.'],
['Juillet – août 2025','Serveur · Andiamo. Service, prise de commandes et encaissement.'],
['Septembre 2024 – mars 2025','Vendeur · Boulangerie. Conseil, réassort et caisse.'],
['Janvier – novembre 2023','Baby-sitter · Particuliers. Organisation et respect des consignes.']
]))));

for (const [file,html] of pages) {
 await mkdir(dirname(resolve(root,file)),{recursive:true});
 await writeFile(resolve(root,file),html.replace(/></g,'>\n<').replace(/[ \t]+$/gm,''),'utf8');
}
const csvCell=s=>'"'+String(s).replace(/"/g,'""')+'"';
const csvRows=[
 ['TABLEAU DE TRAVAIL — ne remplace pas le modèle officiel de la session'],
 ['Réalisation','Période','Contexte','Périmètre',...data.competences.map(c=>c.id+' '+c.title),'Pièces','État des preuves'],
 ...data.projects.map(p=>[p.title,p.period,p.type,p.scope,...data.competences.map(c=>p.mapping.some(m=>m[0]===c.id)?(p.id==='portfolio'?'Support assisté disponible — à justifier':'Lien déclaré — à étayer'):'Non documenté'),'projets/'+p.id+'.html#preuves',p.status])
];
await writeFile(resolve(root,'docs/tableau-synthese-travail.csv'),'\uFEFF'+csvRows.map(row=>row.map(csvCell).join(';')).join('\r\n')+'\r\n','utf8');
const journalRows=[
 ['Source','Date de publication','Date de collecte documentaire assistée','Date de lecture personnelle','Analyse personnelle','Décision / projet','Résultat d’un essai','État'],
 ...sources.map(s=>[s.url,s.date,data.updated,'Non renseignée','À rédiger après lecture','À préciser','Aucun essai personnel attesté','Base documentaire préparée avec assistance IA'])
];
await writeFile(resolve(root,'docs/journal-veille.csv'),'\uFEFF'+journalRows.map(row=>row.map(csvCell).join(';')).join('\r\n')+'\r\n','utf8');
await writeFile(resolve(root,'docs/A_FOURNIR.md'),'# Éléments à fournir avant la réévaluation\n\nVersion du '+updated+'. Cette liste ne constitue pas une validation de conformité.\n\n'+data.missing.map(m=>'## '+m.priority+' — '+m.id+' — '+m.label+'\n\n**À fournir :** '+m.need+'\n\n**Intégration :** '+m.destination+'\n\n**Raison :** '+m.reason+'\n').join('\n').trimEnd()+'\n','utf8');
console.log(pages.size+' pages générées ; tableaux et registre documentaire mis à jour.');
