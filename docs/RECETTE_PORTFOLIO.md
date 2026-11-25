# Recette du portfolio — 25 novembre 2026

Vérifications effectuées sur la branche locale amelioration-portfolio-bts-sio, issue de c43e7c45988d6282e829dd027c20b2b3d728b1d8. Refonte et vérifications avec assistance IA.

## Résultat du site

| Contrôle | Résultat observé |
| --- | --- |
| Génération des pages | 18 pages HTML générées sans erreur |
| Contrôle statique | 18 pages et 45 ressources liées contrôlées ; aucune ressource ou ancre locale manquante |
| Cohérence des contenus | 5 fiches, 6 domaines du bloc support et 7 sources de veille |
| Affichage adaptatif | 18 pages examinées à 375, 768 et 1440 px, soit 54 vérifications ; aucun débordement horizontal détecté |
| Chargement | Toutes les pages répondent en HTTP 200 ; aucune image eager cassée détectée |
| JavaScript | Aucune exception de page observée pendant la navigation |
| Dépendances réseau | Aucun appel externe par les pages du portfolio observé pendant le contrôle |
| Réalisations : filtres | Stage, atelier, projet pédagogique, TP et personnel donnent chacun 1 fiche ; Tous donne 5 |
| Veille technologique : filtres | Productivité : 4 ; Sécurité : 1 ; Tous : 5 |
| Veille juridique | 2 fiches CNIL consultables séparément |
| Sans JavaScript | 5 réalisations et 5 fiches technologiques restent visibles ; les commandes de filtre sont masquées |
| Clavier | Le premier Tab atteint le lien d’évitement ; Entrée place le focus sur le contenu principal |
| Impression | Les extraits repliés sont présents dans le PDF ; leur état initial est restauré après impression |
| Impression après filtrage | Les 5 réalisations sont présentes dans le PDF ; le filtre précédent est restauré |
| Reproductibilité | Nouvelle génération : mêmes empreintes pour les HTML, CSV et liste de pièces |
| Différences Git | git diff --check sans erreur |

Navigateur de contrôle : Chrome 157.0.8103.79 en mode headless sur Windows. Les captures de l’accueil ordinateur/mobile ont été relues visuellement. Les corrections finales de texte ont été régénérées et leurs ressources contrôlées.

## Téléchargements et contenu documentaire

| Fichier | Vérification |
| --- | --- |
| CV_Lucas_Barnaba_Developpement.pdf | PDF lisible sur une page ; rendu relu ; sans téléphone ni adresse postale détaillée |
| Tableau XLSX | 4 feuilles relues ; tableau de travail de 5 réalisations, 7 lignes avec titre et en-tête ; aucune formule |
| CSV | En-têtes explicites et encodage UTF-8 avec BOM ; distinct du modèle officiel |
| Cinq attestations CNIL | Texte des PDF originaux lu intégralement ; nom, module, date et score vérifiés |
| Assemblage CNIL | 5 pages, sans reconstitution des attestations |
| Portrait | Extraction de l’image du CV personnel ; aucun portrait synthétique ni retouche |
| Structures SQL | Extraction CREATE/ALTER uniquement, sans lignes INSERT des exports d’origine |

Le téléchargement du CV, du XLSX et des attestations réunies a été vérifié via HTTP 200 et types MIME correspondants. La confirmation d’inscription BTS consultée confirme le lycée du Parc des Loges, SIO2 et la session 2027 ; le document personnel n’est pas publié.

## Serveur local

Serveur limité à 127.0.0.1. Les demandes de fichiers de configuration cachés sont refusées (HTTP 403). Les pages peuvent aussi être lues directement depuis index.html, sans serveur ; les liens vers des sites extérieurs demandent une connexion.

## Vérification distincte des applications fournies

Cinquante-quatre fichiers PHP passent la vérification de syntaxe PHP 8.2.12. Dix-sept contrôles applicatifs de référence sont consignés dans ANALYSE_SOURCES_PROJETS.md : neuf comportements attendus observés et huit anomalies à corriger. Les contrôles de syntaxe ne sont pas comptés comme des tests métier réussis.

Les applications sont essayées sur des copies, avec une base MariaDB 10.4.32 isolée et des données fictives. Seules les configurations de connexion sont adaptées. Les dossiers Drive et la logique métier d’origine ne sont pas modifiés. Les captures proviennent de ces exécutions.

## Limites exactes

- Aucun audit RGAA/WCAG complet, test avec lecteur d’écran ou certification d’accessibilité.
- Aucune validation par la professeure, un tuteur ou un client.
- Aucun résultat individuel de maîtrise orale.
- Aucun déploiement public de cette nouvelle version : l’accès doit être vérifié après publication.
- Aucun contrôle exhaustif de tous les liens Internet : les sources ont été consultées, mais un changement de partage Drive ou une indisponibilité ultérieure reste possible.
- Aucun test complet de concurrence, de charge, de paiement ou de toutes les fonctions FPDF des applications.
- Aucune réussite SecNumAcadémie ou Cisco déduite d’un mail d’inscription.
- Le tableau livré est préparatoire et ne remplace pas le modèle officiel de la session 2027.

Les points pédagogiques et les éléments attendus figurent dans AUDIT_PORTFOLIO.md et A_FOURNIR.md.
