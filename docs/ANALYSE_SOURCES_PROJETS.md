# Analyse des sources applicatives et essais de référence

Vérification du 25 novembre 2026, effectuée avec assistance IA.

## Périmètre et conditions

Trois dossiers Drive ont été transmis par le candidat. Le registre index-sources.json conserve les chemins, dates de fichiers et empreintes de 60 sources. Cinquante-quatre fichiers PHP ont passé php -l sous PHP 8.2.12. Cette vérification de syntaxe ne prouve pas le fonctionnement ni la sécurité.

Les essais utilisent MariaDB 10.4.32 dans un répertoire et un port séparés de toute base utilisateur. Seuls les CREATE/ALTER des exports sont importés, puis des comptes et produits fictifs sont créés. Seules les configurations de connexion sont adaptées dans des copies de travail. La logique métier des fichiers reçus reste inchangée. Les dossiers Drive ne sont pas modifiés.

Le mode SQL du serveur de test est strict (STRICT_TRANS_TABLES). Le comportement de commande.id peut différer dans un mode permissif ; l’absence d’AUTO_INCREMENT dans l’export reste un constat de structure. Aucune recette d’acceptation du client ni mise en production n’est revendiquée.

## Résultats observés

| ID | Contrôle | Observation | Résultat |
| --- | --- | --- | --- |
| M-01 | Inscription avec données fictives | HTTP 200 | Comportement attendu observé |
| M-02 | Connexion du compte créé | Session puis page compte | Comportement attendu observé |
| M-03 | Accès administrateur avec compte client | Accès refusé | Comportement attendu observé |
| M-04 | Ajout répété au panier | Quantité 3 et total 75 € pour un prix catalogue de 25 € | Comportement attendu observé |
| M-05 | Ne pas dépasser le stock de 2 | Le panier accepte 3 unités pour un stock de 2 | Anomalie à corriger |
| M-06 | Action destructive protégée contre un GET sans jeton | Retrait effectué via GET sans jeton | Anomalie à corriger |
| M-07 | Accès panier après déconnexion | Accès refusé après fermeture de session | Comportement attendu observé |
| E-01 | Connexion du compte épicier fictif | Menu épicier affiché | Comportement attendu observé |
| E-02 | Prix catalogue de la commande téléphonique | Prix affiché à 0.00 € alors que le catalogue contient 12.50 € | Anomalie à corriger |
| E-03 | Enregistrer une commande téléphonique | Échec SQL : commande.id sans valeur par défaut ni AUTO_INCREMENT | Anomalie à corriger |
| E-04 | Invalider la session lors de la déconnexion | Les données de stock restent accessibles après action de déconnexion | Anomalie à corriger |
| E-05 | Réserver les routes épicier au rôle épicier | Le rôle commerçant accède à la route de stock épicier | Anomalie à corriger |
| A-01 | Cinq onglets Formules | Chacun des cinq boutons affiche un seul panneau | Comportement attendu observé |
| A-02 | Formules à 390 px | Pas de débordement horizontal sur la page à 390 px | Comportement attendu observé |
| A-03 | État des onglets exposé aux aides techniques | Le code change des classes CSS ; aucun aria-selected ni rôle d’onglet | Anomalie à corriger |
| A-04 | Réservation d’un créneau libre | Rendez-vous enregistré et confirmation affichée | Comportement attendu observé |
| A-05 | Refuser une suppression de RDV sans session administrateur | Suppression effectuée sans connexion administrateur | Anomalie à corriger |

## Lecture technique

Les schémas sans données sont dans ce dossier de preuves. Les extraits et leurs numéros de ligne sont dans data/evidence.json et les fiches HTML. Les captures représentent les applications fournies avec des données fictives, pas une reconstitution graphique.

- Auto-école : contribution déclarée limitée à Formules. Les défauts de réservation/administration décrivent le projet collectif, sans attribuer ces fonctions au candidat. Les identifiants codés en dur et les données des anciens exports ne sont pas reproduits.
- Site marchand : PDO, hachage et contrôle de session sont observés. Stock, validations, sessions, CSRF et suppression atomique demandent encore une reprise.
- Épi Solidaire : organisation MVC et 19 tables observées ; prix absent de la sélection, commande.id sans automatisme, lignes de commande non créées dans le parcours téléphonique, droits et déconnexion incomplets. Les requêtes d’authentification concaténées nécessitent une correction.

## Interprétation et suites

Les défauts sont des constats de cette revue, pas des incidents historiquement résolus par le candidat. Pour les transformer en situation de maintenance défendable : identifier la version, prendre en charge une demande réelle, enregistrer les corrections puis rejouer les tests pertinents. Ne pas modifier les résultats de référence pour faire croire que la version d’origine était corrigée.

## Limites

Essais ciblés, sans test de charge, de concurrence exhaustive, d’ensemble du PDF FPDF ou de toutes les fonctions des applications. Aucun paiement réel. Aucun secret ni jeu de données original chargé dans la base de test. Les dates de modification de fichiers n’établissent ni la période de travail ni leur auteur. Les droits d’accès des examinateurs aux dossiers Drive sont à vérifier sans modifier leur partage automatiquement.
