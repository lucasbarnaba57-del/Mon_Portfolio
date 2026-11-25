# Audit du portfolio de Lucas Barnaba

Audit du 25 novembre 2026. Point de départ : dépôt Mon_Portfolio, révision c43e7c45988d6282e829dd027c20b2b3d728b1d8. Branche locale de travail : amelioration-portfolio-bts-sio.

## Conclusion d’évaluation

La version initiale était essentiellement descriptive. Elle présentait un parcours et trois projets, mais ne permettait ni d’examiner le travail individuel ni de vérifier les fonctionnalités annoncées. La veille ne contenait aucun article et des ressources visibles étaient cassées. Ce sont des motifs plausibles de pénalisation ; ils ne reconstituent pas le barème ni la justification exacte du 8/20.

La remarque transmise de la professeure porte sur la structure, l’ajout des formations/certifications passées et la photo. La refonte traite ces trois points avec une navigation homogène, un portrait extrait du CV personnel et cinq attestations CNIL originales. Elle approfondit aussi les réalisations et les compétences à partir des sources réellement fournies.

La confirmation d’inscription du 9 novembre 2026 consultée dans la messagerie confirme le lycée du Parc des Loges, la classe SIO2 et la session 2027. Le document personnel n’est pas publié.

La présentation est désormais beaucoup plus exploitable. Une note de 16 ou 18 ne peut cependant pas être déduite d’une refonte : l’enseignante évalue aussi le travail personnel, les preuves, le fonctionnement des applications et la maîtrise orale. Les défauts des applications d’origine sont documentés, pas effacés par la nouvelle présentation.

## Audit de chaque rubrique initiale

| Page / élément | Lacune initiale susceptible de pénaliser | Modification effectuée | Point restant |
| --- | --- | --- | --- |
| Accueil | Présentation générale, sans parcours de lecture ni accès aux compétences ou preuves ; informations répétées | Objectif clair, accès aux fiches et compétences, indicateurs de contenu sans pourcentage de maîtrise, photo réelle | Confirmer le parcours et l’hébergement |
| Qui suis-je ? | Qualités peu étayées ; CV pointant vers file:///P:/ ; absence de doctype ; aucune photo | Présentation recentrée, CV PDF public et version HTML, portrait extrait du CV, pratiques reliées aux projets | Relire le CV ; identifier précisément les contributions |
| Mon parcours | Descriptions générales, outils sans réalisation associée, établissement actuel absent | Chronologie lisible, stage séparé des emplois, usages techniques reliés aux fiches | Établissement et session 2027 confirmés par l’inscription ; périodes précises des projets à vérifier |
| Projet de formation | Pistes d’études et métiers assez vagues, sans étapes ni résultats attendus | Progression en conception, code, données, tests et choix d’orientation ; lien avec la veille | Produire les résultats des actions envisagées ; ne pas présenter une intention comme une réalisation |
| Mes réalisations | Trois fiches sommaires ; deux captures absentes ; équipe du site marchand vide ; pas de sources, schémas ni résultats vérifiables | Une fiche par réalisation, sources examinées pour trois projets, extraits localisés, schémas sans données, captures réelles et essais de référence ; ajout d’Épi Solidaire | Contributions, contexte et bilan personnels ; corrections applicatives |
| Veille | Aucun article ; méthode non démontrée ; texte trop général ; HTML mal fermé avec doublons | Sept sources primaires datées, analyses et limites, méthode proposée, journal de lectures ; page juridique distincte | Lectures et applications personnelles suivies dans la durée |
| CSS et navigation | Mise en page simple ; aucun focus explicite, lien d’évitement ou mode d’impression ; hiérarchie limitée | Gabarit commun, navigation courante, focus visible, responsive, tableaux légendés, filtres progressifs, impression | Une vérification technique ne constitue pas un audit RGAA complet |
| CV initial | Document orienté recherche d’emploi général à temps plein, sans mise en valeur du BTS et du stage ; téléphone public | CV développement PDF d’une page et équivalent web, sans téléphone ni adresse postale détaillée | Dates et périmètres à valider avant candidature |

Les fichiers HTML sont générés depuis un gabarit commun ; le contenu peut être lu sans JavaScript et hors ligne. Les chemins relatifs sont contrôlés. Aucun CMS n’est ajouté.

## Rubriques et pièces ajoutées

| Élément | Apport réel | Limite |
| --- | --- | --- |
| Compétences | Six domaines du bloc support, rattachements expliqués, écarts visibles, sous-activités et références | Aucun domaine n’est marqué « validé » par simple présence d’un projet |
| Tableau XLSX et CSV | Base de travail avec périodes, périmètres, liens et états documentaires | Ce n’est pas le modèle réglementaire de la session |
| Documents et registre | Chaque pièce attendue possède un identifiant, un contenu précis, une destination et une raison | Une liste n’est pas une preuve produite |
| Certifications et formations | Modules CNIL 1, 3, 4, 5 et 6 avec PDF nominatifs, dates et scores | Module 2 non retrouvé ; pas de revendication de parcours complet |
| SecNumAcadémie | Inscription retrouvée au 7 novembre 2025 ; réussite déclarée par le candidat | Attestation de réussite non retrouvée |
| Cisco | Cours identifié : Introduction à la cybersécurité ; inscription du 6 février 2026 | Certificat ou badge non retrouvé ; aucune certification CCNA attribuée |
| Portrait | Image extraite du document personnel Lucas BARNABA CV.docx | Aucun portrait généré ou image d’une autre personne utilisé |
| Analyse des sources | Empreintes, structures SQL sans lignes de données, extraits et essais | L’auteur du code ne se déduit pas du fichier ; les permissions Drive du jury sont à vérifier |
| Architecture / guide / recette | Reprise du projet, génération, vérifications et publication documentées | Le déploiement public de cette nouvelle version n’est pas présumé |

## Audit de chaque réalisation

### Auto École Excellence

Éléments établis : cinq catégories de formules dans index.php, interaction showTab, règles CSS responsive et source de réservation PHP/PDO. Le candidat déclare avoir travaillé sur Formules ; la réservation et l’administration restent décrites comme le contexte collectif.

Les cinq onglets ont été actionnés et la page examinée à 390 px. Les captures de la fiche proviennent du vrai fichier fourni. Une réservation avec données fictives fonctionne dans la configuration de vérification.

Points faibles : aucune répartition signée ou historique ne prouve encore la contribution ; absence d’état sémantique des onglets pour les aides techniques ; identifiants administrateur codés en dur dans le prototype collectif ; suppression de rendez-vous sans vérification de session ; confirmation et PDF récupérés par identifiant ; absence de contrainte d’unicité du créneau dans l’export. Un SELECT préalable ne suffit pas à garantir l’unicité en cas de concurrence.

À défendre : le rôle précis de HTML, CSS et JavaScript ; la différence entre un bouton qui fonctionne et une interface accessible ; le besoin réel de l’auto-école ; la distinction entre prototype et service publié. Fournir le retour du tuteur.

### Élégance Pluvieuse

Éléments établis : quatorze fichiers PHP, PDO, inscription avec password_hash, connexion avec password_verify, clé composée du panier, contraintes SQL, total calculé avec les prix du catalogue, accès administrateur conditionné et back-office d’ajout/suppression de produits. La refonte ne maintient donc pas l’affirmation initiale selon laquelle le back-office serait seulement une piste future.

Les essais confirment la création d’un compte fictif, la connexion, le calcul du panier, le refus du back-office à ce compte et le refus du panier après déconnexion.

Points faibles : l’ajout dépasse le stock ; des actions de modification utilisent GET sans jeton ; l’identifiant de session n’est pas renouvelé lors de la connexion ; des valeurs d’image sont insérées dans des attributs sans échappement ; les validations côté serveur et la suppression de produit par deux requêtes sans transaction doivent être reprises. L’équipe, la période réelle et le périmètre personnel restent inconnus.

À défendre : la clé composée, l’identité obtenue en session, la jointure du panier, hachage contre chiffrement, requête préparée contre validation métier. Ne pas annoncer de paiement, de commande commerciale ou de conformité globale non présents.

### Épi Solidaire

La nouvelle fiche s’appuie sur les dossiers de contrôleurs, vues et modèle ainsi qu’un schéma SQL de 19 tables. L’organisation MVC, les clés composées des articles et des lignes de commande, les fonctions de stock, commande et livraison sont examinables.

Les essais reproduisent plusieurs défauts importants :

- Le prix vaut 0.00 dans l’écran de commande téléphonique, car le SELECT utilisé ne renvoie pas le prix attendu.
- L’insertion de commande échoue dans la base fournie en mode strict : commande.id n’est pas AUTO_INCREMENT et le code ne le renseigne pas.
- Le contrôleur de commande ne crée pas de ligne_commande et accepte le prix transmis par le client.
- Un compte commerçant peut accéder à la route de stock épicier ; le menu seul ne protège pas l’action.
- L’action de déconnexion ne détruit pas la session dans le contrôleur fourni.
- Plusieurs requêtes d’authentification et de gestion restent construites par concaténation ; les transactions de commande/livraison ne sont pas mises en œuvre.

À défendre : distinguer support initial et modifications personnelles ; suivre une action du routeur à la vue ; expliquer une jointure et une clé composée. Avant de présenter le parcours comme fonctionnel, corriger les défauts réellement pris en charge et conserver leur non-régression.

### TP de veille de première année

La description historique est conservée avec son périmètre individuel déclaré. Aucun fichier original ni article de ce TP n’a été retrouvé dans les dossiers transmis. La nouvelle veille ne remplace pas rétroactivement ce travail. Fournir au moins une version originale et sa date, ou retirer cette réalisation des preuves si elle ne peut pas être retrouvée.

### Portfolio

Le code, les documents, les sources de veille et les vérifications sont consultables. Le site apporte une réalisation concrète de présence en ligne et de documentation, mais sa refonte a été effectuée avec assistance IA. Le candidat doit pouvoir expliquer les données, le gabarit, les liens, les filtres et les choix de structure. Ce site statique ne remplace pas une application métier du bloc SLAM.

## Veille : amélioration et risque restant

Les sources confrontent une expérience GitHub sur la qualité, des travaux METR de 2025 et de 2026, le guide OWASP 2026 et deux fiches CNIL. Les dates de publication sont séparées de la collecte documentaire du 25 novembre 2026. Les résultats de contextes différents ne sont pas additionnés ni généralisés.

Risque principal : les analyses préparées avec assistance ne démontrent pas une veille personnelle sur plusieurs mois. Relire les articles, reformuler les analyses, expliquer une contradiction et produire un essai réel. Le journal ne contient aucune fausse date de lecture.

## Compétences et pièces encore pénalisantes

| Priorité | Point faible | Conséquence possible | Action précise |
| --- | --- | --- | --- |
| P0 | Contribution individuelle indéterminée pour le site marchand et Épi Solidaire | Le jury ne peut pas attribuer le travail au candidat | Fichiers/fonctions personnels, répartition, commits, support fourni et explication orale |
| P0 | Anomalies métier et sécurité dans les applications | Une démonstration peut échouer ; maîtrise incomplète | Corriger, tracer et tester la version présentée, surtout commandes et droits d’Épi Solidaire |
| P0 | Patrimoine et support sans situation démontrée | Couverture insuffisante du bloc support | Inventaire réel, droits, sauvegarde/restauration, incident ou évolution réellement traité |
| P0 | Modèle officiel de la session 2027 non joint | Dossier difficile à contrôler ou non conforme aux modalités de l’établissement | Utiliser le modèle de la bonne session et vérifier avec l’enseignante |
| P0 | Veille initiale assistée sans continuité personnelle | Une collection d’articles ne suffit pas | Journal de lectures et d’applications réelles, sans antidater |
| P0 | Maîtrise orale du contenu non vérifiée | Difficulté à défendre un contenu préparé avec aide | Expliquer les extraits et démontrer le comportement des applications |
| P1 | Validation du stage et recette utilisateur absentes | Réponse au besoin et mise à disposition peu étayées | Retour du tuteur, guide et recette après correction |
| P1 | Attestations SecNumAcadémie/Cisco absentes ; module CNIL 2 non retrouvé | Revendication de réussite non vérifiable | Télécharger les vrais justificatifs des plateformes, s’ils existent |
| P1 | Déploiement de cette nouvelle version non vérifié | Portfolio inaccessible le jour de l’évaluation | Publier la version relue, vérifier les droits et les liens ; garder une copie hors ligne |

## Ce qui serait nécessaire pour viser une appréciation élevée

L’ordre utile est : identifier sa contribution ; disposer d’applications démontrables ; corriger les défauts critiques ; fournir les pièces de compétences réellement manquantes ; tenir et exploiter sa veille ; préparer l’oral. Les attestations et la photo répondent aux remarques de présentation, mais elles ne compensent pas une commande qui échoue ou un travail personnel impossible à distinguer.

L’ensemble des demandes est détaillé dans A_FOURNIR.md et dans documents.html. Les résultats du portfolio lui-même sont consignés dans RECETTE_PORTFOLIO.md ; les essais applicatifs de référence et leurs limites sont dans ANALYSE_SOURCES_PROJETS.md.

## Références

- Référentiel BTS SIO : https://www.reseaucerta.org/sites/default/files/sio/BTS_SIO_referentiel_Avril2019.pdf
- Arrêté modificatif du 8 juillet 2024 : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049926463
- Documents académiques 2026, dont le tableau : https://www.toutatice.fr/portail/share/TBIRcZ?l=wNsQIf

Les documents 2026 servent à vérifier la structure du dossier ; aucune date administrative 2026 n’est donnée comme échéance de la session personnelle. Les codes B1.1 à B1.6 sont des repères internes au portfolio, pas une numérotation réglementaire imposée.
