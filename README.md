# Portfolio Lucas Barnaba — BTS SIO SLAM

Ce site statique présente le parcours, les réalisations déclarées, les liens avec les compétences du BTS et une base de veille sourcée. Les pièces manquantes sont explicites ; elles ne sont jamais fabriquées. Refonte du 25 novembre 2026 avec assistance IA, à relire et à s’approprier.

## Consulter le site

Ouvrir `index.html` dans un navigateur. Les contenus et liens internes fonctionnent sans JavaScript et sans connexion, à l’exception des références externes. Le filtre nécessite JavaScript. Aucun serveur PHP, compte ou dépendance de production n’est nécessaire.

Pour une consultation via HTTP avec Node.js 20 ou supérieur :

```sh
npm run serve
```

Ouvrir l’adresse affichée, par défaut http://127.0.0.1:4173. Le serveur est local et sert uniquement ce dossier, en excluant les répertoires de configuration cachés.

## Modifier le contenu

- `data/portfolio.json` : projets, période, contribution, analyse, compétences et liste des pièces attendues.
- `data/veille.json` : sources, dates, synthèses, limites et conséquences proposées.
- `scripts/build.mjs` : contenu éditorial des pages et gabarit commun.
- `style.css` : mise en page, responsive, focus et impression.
- `assets/app.js` : filtres et impression avec amélioration progressive.
- `docs/` : audit, pièces attendues, architecture, tableau de travail et recette.
- `cv/` : CV PDF public, sans téléphone ni adresse postale détaillée.

Après modification des données ou du gabarit :

```sh
npm run build
npm run check
```

Les pages HTML sont générées et conservées dans Git. Ne pas modifier seulement un HTML généré : le changement serait perdu à la génération suivante. Le build ne requiert aucun téléchargement. Le contrôle couvre les ressources et ancres locales, la structure minimale, les rattachements et les régressions connues. Il ne remplace ni un validateur HTML complet ni un audit RGAA.

Le PDF et le XLSX sont des livrables statiques. Leur régénération optionnelle passe par `scripts/create_documents.py`, avec Python, reportlab et openpyxl. Les autres commandes n’en dépendent pas. Les informations ont été reprises du portfolio et du CV d’origine ; confirmer les dates avant candidature.

## Compléter les preuves

Commencer par [la liste précise des pièces](docs/A_FOURNIR.md), [l’audit](docs/AUDIT_PORTFOLIO.md) et la page `documents.html`. Ajouter uniquement des fichiers réels et anonymisés. Ne jamais enregistrer de secrets, de données client ou de signatures dans ce dépôt public.

Pour une nouvelle preuve, la lier dans le gabarit de la fiche correspondante, puis modifier l’état documentaire dans les données. Pour une nouvelle réalisation, créer une entrée factuelle dans `data/portfolio.json` et vérifier les rattachements. Les termes « proposé », « déclaré » et « observé » ont des sens différents ; ne pas annoncer un test réussi tant qu’il n’a pas été exécuté.

Les repères B1.1 à B1.6 sont internes au portfolio. Le tableau XLSX fourni est un **tableau de travail**, distinct du modèle officiel de la session. Confirmer la session et les consignes avec l’enseignante.

## Publier la version relue

Aucun push ni déploiement n’est effectué automatiquement par les scripts.

1. Relire les informations personnelles, dates, contributions, analyses et mentions d’hébergement.
2. Exécuter `npm run build` puis `npm run check`.
3. Examiner les différences avec `git diff`, puis enregistrer les changements dans le dépôt.
4. Si GitHub Pages est le fournisseur choisi, configurer sa source dans les paramètres du dépôt, sur la branche contenant les fichiers validés, dossier racine. Une autre solution d’hébergement statique peut aussi servir ce dossier.
5. Utiliser l’URL réellement fournie par l’hébergeur ; vérifier toutes les pages, le CV, les téléchargements, les ancres et la navigation mobile depuis cette URL.
6. Renseigner les informations du fournisseur réel dans `mentions-legales.html` via le gabarit et régénérer.

Aucune URL publique de cette nouvelle version n’est inventée. Les liens relatifs sont compatibles avec un hébergement sous un chemin de dépôt. Ne pas supposer que le dépôt GitHub est une preuve de mise en production.

## Préparer l’évaluation

Conserver une copie locale complète, tester les applications sur un autre poste, utiliser des données fictives et savoir expliquer le code présenté. Les résultats de la recette du portfolio sont dans [RECETTE_PORTFOLIO.md](docs/RECETTE_PORTFOLIO.md). Des essais de référence des trois applications fournies sont consignés dans docs/ANALYSE_SOURCES_PROJETS.md. Les scénarios complémentaires doivent être reproduits après correction ; ils ne constituent pas une recette complète.
