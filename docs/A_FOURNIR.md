# Éléments à fournir avant la réévaluation

Version du 25 novembre 2026. Cette liste ne constitue pas une validation de conformité.

## P0 — GEN-01 — Consignes de réévaluation et dates précises

**À fournir :** L’établissement, la classe SIO2 et la session 2027 sont confirmés par la confirmation d’inscription du 9 novembre 2026. Préciser la date de réévaluation et fournir la grille ou les attentes détaillées de la professeure si elles existent. Les dates de projets et contributions doivent être vérifiées séparément.

**Intégration :** data/portfolio.json et parcours.html après génération

**Raison :** La session et l’établissement sont désormais établis ; le barème précis et la date de réévaluation ne figurent pas dans les documents consultés.

## P0 — GEN-02 — Tableau officiel et attestations

**À fournir :** Renseigner le modèle officiel de tableau de synthèse de ta session avec les périodes exactes, productions et compétences réellement justifiées. Fournir les attestations de stage à l’établissement selon ses modalités, sans publier signatures et coordonnées privées.

**Intégration :** Tableau public anonymisé dans docs/ ; attestations remises à l’établissement

**Raison :** Le tableau de travail livré n’est pas le modèle réglementaire et ne prouve pas la conformité du dossier.

## P0 — AE-01 — Auto-école : attribution et version de référence

**À fournir :** Les sources et les captures de Formules sont désormais examinées. Confirmer que cette section et ses fichiers correspondent à ta version de stage ; identifier précisément ce que tu as écrit et ce qui vient du binôme.

**Intégration :** Liens à ajouter dans data/portfolio.json ; pièces anonymisées dans docs/preuves/auto-ecole/

**Raison :** L’accès au code démontre le contenu du dossier, pas l’auteur de chaque partie.

## P0 — AE-02 — Auto-école : contribution et validation

**À fournir :** Fournir une répartition des tâches en binôme, un planning daté, tes commits ou fichiers identifiés, le besoin ou cahier des charges, et un retour réel du tuteur sur le prototype.

**Intégration :** docs/preuves/auto-ecole/ ; fiche projet

**Raison :** Le travail personnel et la réponse au besoin client restent seulement déclarés.

## P1 — AE-03 — Auto-école : recette et bilan

**À fournir :** Reproduire les essais de la fiche, puis documenter les corrections réellement effectuées, l’accessibilité des onglets et une difficulté vécue pendant le stage. Ajouter la recette ou le retour du tuteur si tu l’as.

**Intégration :** docs/preuves/auto-ecole/recette.md

**Raison :** Les essais de la refonte sont datés et assistés ; ils ne remplacent pas ton bilan ni la validation du stage.

## P0 — EP-01 — Site marchand : version et accès aux sources

**À fournir :** Le dossier PHP et le schéma SQL fournis ont été examinés et installés pour les essais. Confirmer la version de référence, les dates et les droits d’accès de la professeure. Fournir un dépôt versionné ou une archive nettoyée avec configuration d’exemple sans secret.

**Intégration :** Dépôt de l’application lié depuis la fiche ; ne pas ajouter de mots de passe au portfolio

**Raison :** Le lecteur doit pouvoir accéder à la même version et reproduire les essais.

## P0 — EP-02 — Site marchand : auteur et conception

**À fournir :** Préciser dates, équipe et pages/fonctions écrites personnellement ; joindre cahier des charges, MCD/MLD personnel si réalisé, historique ou répartition. Le schéma SQL et les extraits sont déjà analysés dans cette version.

**Intégration :** docs/preuves/elegance-pluvieuse/ ; data/portfolio.json

**Raison :** Le fonctionnement du code ne permet pas d’identifier automatiquement la contribution de chaque personne.

## P0 — EP-03 — Site marchand : sécurité et recette

**À fournir :** Reprendre les défauts observés (stock, actions GET/CSRF, sessions, sorties d’image, suppression sans transaction), corriger ceux que tu prends réellement en charge et exécuter les scénarios de non-régression. Les résultats de la revue initiale sont conservés.

**Intégration :** docs/preuves/elegance-pluvieuse/recette.md

**Raison :** Les protections partielles présentes dans le code ne rendent pas la boutique prête pour une exploitation commerciale.

## P1 — EP-04 — Site marchand : incident ou évolution réelle

**À fournir :** Décrire une anomalie ou une demande d’évolution réellement traitée : avant, reproduction, diagnostic, correction, commit et non-régression ; ajouter un court guide utilisateur.

**Intégration :** docs/preuves/elegance-pluvieuse/incident.md et guide-utilisateur.md

**Raison :** Permettrait d’étayer B1.2 et B1.5 si l’intervention a effectivement eu lieu.

## P1 — VT-01 — TP de veille : version originale

**À fournir :** Fournir les fichiers du TP, ses dates et au moins une fiche originale avec sa source, pour distinguer le travail antérieur de la veille préparée lors de la refonte.

**Intégration :** Lien du TP et docs/preuves/site-veille/

**Raison :** La réalisation historique est seulement décrite.

## P0 — VT-02 — Veille : appropriation et continuité

**À fournir :** Relire les fiches actuelles, écrire ton analyse personnelle et tenir un journal réel sur plusieurs semaines : source, date de lecture, information retenue, limite, conséquence et essai éventuel. Ne pas antidater les lectures.

**Intégration :** docs/journal-veille.csv et veille.html via scripts/build.mjs

**Raison :** Une collecte initiale assistée ne démontre pas une veille personnelle suivie.

## P0 — B1-01 — Patrimoine informatique

**À fournir :** Fournir une situation réellement pratiquée : inventaire des outils et versions, droits d’accès, procédure de sauvegarde et résultat d’une restauration. Un exercice réalisé maintenant doit porter sa vraie date.

**Intégration :** docs/preuves/patrimoine/ puis lien dans la matrice

**Raison :** B1.1 n’est pas couverte par une preuve exploitable.

## P0 — B1-02 — Support et demandes

**À fournir :** Fournir au moins un incident ou une évolution réelle documentée (application, assistance ou service), avec suivi et validation. Aucune situation fictive ne doit être présentée comme une expérience vécue.

**Intégration :** docs/preuves/support/ puis lien dans la matrice

**Raison :** B1.2 n’est pas couverte par une preuve exploitable.

## P1 — PF-01 — Publication et identité professionnelle

**À fournir :** Vérifier l’adresse de contact reprise du CV, confirmer les dates et relire le nouveau CV. Le portrait et les attestations CNIL sont retrouvés. Choisir l’URL d’hébergement, confirmer les mentions du fournisseur et tester la version publiée.

**Intégration :** data/portfolio.json, contact et informations de publication

**Raison :** Le lien GitHub du code ne prouve pas l’accessibilité du site publié.

## P0 — PF-02 — Appropriation pour l’oral

**À fournir :** Savoir expliquer le HTML/CSS, le filtre JavaScript, la génération et les vérifications ; corriger les faits après relecture. Préparer une démonstration des applications avec données fictives et une copie hors ligne.

**Intégration :** Préparation personnelle à partir des fiches et de docs/A_FOURNIR.md

**Raison :** Un contenu assisté doit être maîtrisé et étayé par ton travail.

## P0 — SLAM-01 — Deuxième année : périmètre d’Épi Solidaire et épreuves

**À fournir :** La fiche Épi Solidaire est ajoutée à partir des fichiers transmis. Confirmer période, équipe, missions personnelles et support de cours. Pour les réalisations retenues à l’épreuve de développement, joindre les fiches de la session et vérifier le périmètre avec l’enseignante.

**Intégration :** Nouvelles entrées dans data/portfolio.json et pièces de projets

**Raison :** Une analyse de sources ne remplace pas la preuve du travail individuel ni les pièces attendues par l’établissement.

## P0 — ES-01 — Épi Solidaire : contexte et contribution

**À fournir :** Fournir le cahier des charges, les dates réelles, l’équipe et la liste de tes fonctions/fichiers. Distinguer le support fourni, le travail du binôme et tes modifications, avec des commits ou documents.

**Intégration :** Fiche Épi Solidaire et docs/preuves/epi-solidaire/

**Raison :** Le code reçu contient des modules de dates et d’origines différentes ; leur présence ne prouve pas leur auteur.

## P0 — ES-02 — Épi Solidaire : commandes, droits et sessions

**À fournir :** Corriger sur ta version de référence les défauts constatés : prix catalogue absent, identifiant de commande, lignes de commande, contrôles de rôle, déconnexion et requêtes SQL concaténées. Documenter les corrections réellement réalisées et les tests sur données fictives.

**Intégration :** Dépôt applicatif puis compte rendu lié depuis la fiche

**Raison :** Ces défauts ont été observés ou reproduits dans la revue et empêchent de présenter une chaîne métier fiable.

## P1 — ES-03 — Épi Solidaire : recette et mise à disposition

**À fournir :** Après correction, exécuter la chaîne stock → commande → livraison, les erreurs et les cas de concurrence ; vérifier les transactions et fournir un guide utilisateur. Donner l’environnement et la procédure d’installation à la professeure.

**Intégration :** docs/preuves/epi-solidaire/recette.md et guide-utilisateur.md

**Raison :** La vérification de syntaxe et les essais partiels ne valent pas une recette d’acceptation.

## P1 — CERT-01 — Attestations complémentaires à retrouver

**À fournir :** Les modules CNIL 1, 3, 4, 5 et 6 sont retrouvés. Fournir le module 2 s’il a été validé, l’attestation de réussite SecNumAcadémie et le certificat ou badge Cisco « Introduction à la cybersécurité ». Les mails retrouvés prouvent seulement l’inscription aux deux dernières formations.

**Intégration :** docs/certifications/ et page certifications.html

**Raison :** Une inscription, un compte Pix ou une newsletter ne prouve pas une certification obtenue.
