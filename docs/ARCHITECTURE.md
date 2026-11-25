# Architecture et décisions

Version du 25 novembre 2026, produite avec assistance IA.

## Site et données

Le portfolio est statique. Les pages contiennent leur contenu HTML et restent consultables sans JavaScript. Aucun backend, compte, cookie, stockage local, mesure d’audience ou appel à un service d’IA n’est ajouté au site.

Les applications fournies via Drive ont été examinées séparément. Leurs secrets et leurs lignes de données originales ne sont pas republiés. Le portfolio conserve des extraits sélectionnés, des structures SQL sans INSERT, des captures de tests sur données fictives et les empreintes de 60 fichiers sources.

| Élément | Rôle |
| --- | --- |
| data/portfolio.json | Parcours, projets, compétences, pièces attendues et attestations |
| data/veille.json | Sources, dates, résumés, limites et conséquences proposées |
| data/evidence.json | Extraits localisés, structures et essais de référence |
| scripts/build.mjs | Gabarit commun et génération déterministe des 18 pages et CSV |
| style.css | Styles, responsive, focus et impression |
| assets/app.js | Filtres locaux et impression avec amélioration progressive |
| assets/projets/ | Captures authentiques des applications sur données fictives |
| assets/portrait-lucas.png | Portrait extrait du CV personnel, sans retouche |
| scripts/check.mjs | Ressources, ancres, structure minimale et cohérence documentaire |
| scripts/serve.mjs | Consultation locale sur 127.0.0.1 ; répertoires cachés exclus |
| scripts/create_documents.py | Régénération facultative du CV, du XLSX et de l’assemblage des attestations |
| docs/ | Audit, recette, preuves, attestations, architecture et liste de pièces |

## Décisions et contreparties

| Décision | Motif | Contrepartie |
| --- | --- | --- |
| Générer et versionner le HTML | Navigation cohérente et usage hors ligne sans installation | Modifier données/gabarit puis régénérer ; un changement seulement dans un HTML serait perdu |
| Aucune dépendance de production | Consultation simple et nombre réduit de points de panne | Polices système ; rendu légèrement différent selon le poste |
| Séparer contenu et preuves | Corriger un fait sans réécrire toutes les pages | Vérifier la cohérence du PDF et du XLSX après modification |
| Filtres progressifs | Faciliter la lecture sans rendre JavaScript indispensable | Le mode sans script affiche tous les éléments |
| Montrer les anomalies observées | Présenter la version réelle et des priorités de maintenance | Un diagnostic ne prouve pas une correction effectuée par le candidat |
| Différencier attestation et inscription | Éviter une réussite non étayée | Attestations SecNumAcadémie et Cisco encore attendues |

## Sécurité et données du portfolio

Le générateur échappe les données avant insertion. Les filtres ne transforment aucune saisie en HTML. Le contact est un lien de messagerie, sans formulaire serveur. Les conditions de traitement des journaux par l’hébergement doivent être précisées à partir du fournisseur effectivement retenu.

Les structures SQL publiées sont extraites des fichiers reçus sans les INSERT d’origine. Elles documentent le modèle reçu et ne sont pas présentées comme un modèle personnel créé pendant la refonte.

## Vérification et reprise

La génération et le contrôle statique utilisent Node.js sans installation de paquet. La création facultative des PDF/XLSX utilise Python, reportlab, pypdf et openpyxl.

Une copie complète peut être consultée hors ligne. Cela ne prouve pas que le candidat a mis en œuvre une stratégie de sauvegarde d’un service ni qu’il a effectué une restauration : produire une procédure et un résultat réels pour cette compétence.

Les contrôles d’accessibilité comprennent la structure, le clavier, le focus, les tableaux et le mode sans JavaScript. Ils ne constituent pas un audit RGAA complet. Consulter la recette pour les résultats observés.
