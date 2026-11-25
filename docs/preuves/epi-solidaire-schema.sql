-- Extrait des structures CREATE/ALTER du fichier fourni, sans donnees INSERT.
-- Consultation du 25 novembre 2026 ; ce n'est pas un MCD cree par le candidat.

CREATE TABLE `acheter` (
  `idAcheteur` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `refProduit` varchar(5) NOT NULL,
  `prixAchat` decimal(5,2) DEFAULT NULL,
  `dateAchat` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `acheteur` (
  `id` int(11) NOT NULL,
  `idHabitant` int(11) NOT NULL,
  `idFoyer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `refProduit` varchar(5) NOT NULL,
  `datePeremption` date NOT NULL,
  `idEtat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `civilite` (
  `id` int(11) NOT NULL,
  `libelle` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `commande` (
  `id` int(11) NOT NULL,
  `idAcheteur` int(11) NOT NULL,
  `dateCommande` datetime NOT NULL DEFAULT current_timestamp(),
  `prixTotal` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `commercant` (
  `id` int(11) NOT NULL,
  `idHabitant` int(11) NOT NULL,
  `idFoyer` int(11) NOT NULL,
  `idCommerce` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `commerce` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL,
  `rue` varchar(100) DEFAULT NULL,
  `codePostal` varchar(5) DEFAULT NULL,
  `ville` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `don` (
  `idDon` int(11) NOT NULL,
  `idCommercant` int(11) NOT NULL,
  `produit` varchar(50) NOT NULL,
  `quantite` int(11) NOT NULL,
  `datePeremption` date NOT NULL,
  `dateDeclaration` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `donner` (
  `idCommerce` int(11) NOT NULL,
  `refProduit` varchar(5) NOT NULL,
  `dateJour` datetime NOT NULL DEFAULT current_timestamp(),
  `prixOrigine` decimal(5,2) DEFAULT NULL,
  `qte` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `employe` (
  `idEmploye` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `login` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  `telephone` varchar(12) DEFAULT NULL,
  `mail` varchar(70) NOT NULL,
  `dateEmbauche` date NOT NULL,
  `idRole` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `etatarticle` (
  `id` int(11) NOT NULL,
  `libelle` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `foyer` (
  `id` int(11) NOT NULL,
  `rue` varchar(100) NOT NULL,
  `codePostal` varchar(5) NOT NULL,
  `ville` varchar(50) NOT NULL,
  `dateInstallation` date NOT NULL,
  `justificatifsValides` tinyint(1) NOT NULL DEFAULT 0,
  `mail` varchar(100) DEFAULT NULL,
  `telephoneFixe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `habitant` (
  `idHabitant` int(11) NOT NULL,
  `idFoyer` int(11) NOT NULL,
  `idCivilite` int(11) DEFAULT NULL,
  `Nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `dateNaiss` date NOT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `telephonePortable` varchar(10) DEFAULT NULL,
  `ciValide` int(1) DEFAULT 0,
  `dateValidation` date DEFAULT NULL,
  `idEmployeValidation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ligne_commande` (
  `idCommande` int(11) NOT NULL,
  `idArticle` int(11) NOT NULL,
  `refProduit` varchar(5) NOT NULL,
  `prixAchat` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `livraison_epicerie` (
  `idCommande` int(11) NOT NULL,
  `dateLivraison` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `produit` (
  `reference` varchar(5) NOT NULL,
  `designation` varchar(75) NOT NULL,
  `qteStock` int(11) NOT NULL,
  `prix` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `role` (
  `idRole` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vendre` (
  `idCommerce` int(11) NOT NULL,
  `refProduit` varchar(5) NOT NULL,
  `dateJour` datetime NOT NULL DEFAULT current_timestamp(),
  `prixOrigine` decimal(5,2) DEFAULT NULL,
  `prixSolidaire` decimal(5,2) DEFAULT NULL,
  `qte` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `vente` (
  `idVente` int(11) NOT NULL,
  `idCommercant` int(11) NOT NULL,
  `produit` varchar(50) NOT NULL,
  `quantite` int(11) NOT NULL,
  `prixReduit` decimal(5,2) NOT NULL,
  `datePeremption` date NOT NULL,
  `dateDeclaration` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `acheter`
  ADD PRIMARY KEY (`idAcheteur`,`idArticle`,`refProduit`),
  ADD KEY `idArticle` (`idArticle`,`refProduit`);

ALTER TABLE `acheteur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idHabitant` (`idHabitant`,`idFoyer`);

ALTER TABLE `article`
  ADD PRIMARY KEY (`id`,`refProduit`),
  ADD KEY `refProduit` (`refProduit`),
  ADD KEY `idEtat` (`idEtat`);

ALTER TABLE `civilite`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAcheteur` (`idAcheteur`);

ALTER TABLE `commercant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idHabitant` (`idHabitant`,`idFoyer`),
  ADD KEY `idCommerce` (`idCommerce`);

ALTER TABLE `commerce`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `don`
  ADD PRIMARY KEY (`idDon`),
  ADD KEY `idCommercant` (`idCommercant`);

ALTER TABLE `donner`
  ADD PRIMARY KEY (`idCommerce`,`refProduit`,`dateJour`),
  ADD KEY `refProduit` (`refProduit`);

ALTER TABLE `employe`
  ADD PRIMARY KEY (`idEmploye`),
  ADD KEY `fk_employe_role` (`idRole`);

ALTER TABLE `etatarticle`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `foyer`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `habitant`
  ADD PRIMARY KEY (`idHabitant`,`idFoyer`),
  ADD KEY `idFoyer` (`idFoyer`),
  ADD KEY `idCivilite` (`idCivilite`),
  ADD KEY `idEmployeValidation` (`idEmployeValidation`);

ALTER TABLE `ligne_commande`
  ADD PRIMARY KEY (`idCommande`,`idArticle`,`refProduit`),
  ADD KEY `idArticle` (`idArticle`,`refProduit`);

ALTER TABLE `livraison_epicerie`
  ADD PRIMARY KEY (`idCommande`);

ALTER TABLE `produit`
  ADD PRIMARY KEY (`reference`);

ALTER TABLE `role`
  ADD PRIMARY KEY (`idRole`);

ALTER TABLE `vendre`
  ADD PRIMARY KEY (`idCommerce`,`refProduit`,`dateJour`),
  ADD KEY `refProduit` (`refProduit`);

ALTER TABLE `vente`
  ADD PRIMARY KEY (`idVente`),
  ADD KEY `idCommercant` (`idCommercant`);

ALTER TABLE `acheteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `civilite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `commercant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `commerce`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `don`
  MODIFY `idDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `employe`
  MODIFY `idEmploye` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `foyer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `role`
  MODIFY `idRole` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `vente`
  MODIFY `idVente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `acheter`
  ADD CONSTRAINT `acheter_ibfk_1` FOREIGN KEY (`idArticle`,`refProduit`) REFERENCES `article` (`id`, `refProduit`),
  ADD CONSTRAINT `acheter_ibfk_2` FOREIGN KEY (`idAcheteur`) REFERENCES `acheteur` (`id`);

ALTER TABLE `acheteur`
  ADD CONSTRAINT `acheteur_ibfk_1` FOREIGN KEY (`idHabitant`,`idFoyer`) REFERENCES `habitant` (`idHabitant`, `idFoyer`);

ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`refProduit`) REFERENCES `produit` (`reference`),
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`idEtat`) REFERENCES `etatarticle` (`id`);

ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`idAcheteur`) REFERENCES `acheteur` (`id`);

ALTER TABLE `commercant`
  ADD CONSTRAINT `commercant_ibfk_1` FOREIGN KEY (`idHabitant`,`idFoyer`) REFERENCES `habitant` (`idHabitant`, `idFoyer`),
  ADD CONSTRAINT `commercant_ibfk_2` FOREIGN KEY (`idCommerce`) REFERENCES `commerce` (`id`);

ALTER TABLE `don`
  ADD CONSTRAINT `don_ibfk_1` FOREIGN KEY (`idCommercant`) REFERENCES `commercant` (`id`);

ALTER TABLE `donner`
  ADD CONSTRAINT `donner_ibfk_1` FOREIGN KEY (`refProduit`) REFERENCES `produit` (`reference`),
  ADD CONSTRAINT `donner_ibfk_2` FOREIGN KEY (`idCommerce`) REFERENCES `commerce` (`id`);

ALTER TABLE `employe`
  ADD CONSTRAINT `fk_employe_role` FOREIGN KEY (`idRole`) REFERENCES `role` (`idRole`);

ALTER TABLE `habitant`
  ADD CONSTRAINT `habitant_ibfk_1` FOREIGN KEY (`idFoyer`) REFERENCES `foyer` (`id`),
  ADD CONSTRAINT `habitant_ibfk_2` FOREIGN KEY (`idCivilite`) REFERENCES `civilite` (`id`),
  ADD CONSTRAINT `habitant_ibfk_3` FOREIGN KEY (`idEmployeValidation`) REFERENCES `employe` (`idEmploye`);

ALTER TABLE `ligne_commande`
  ADD CONSTRAINT `ligne_commande_ibfk_1` FOREIGN KEY (`idArticle`,`refProduit`) REFERENCES `article` (`id`, `refProduit`),
  ADD CONSTRAINT `ligne_commande_ibfk_2` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`id`);

ALTER TABLE `livraison_epicerie`
  ADD CONSTRAINT `livraison_epicerie_ibfk_1` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`id`);

ALTER TABLE `vendre`
  ADD CONSTRAINT `vendre_ibfk_1` FOREIGN KEY (`refProduit`) REFERENCES `produit` (`reference`),
  ADD CONSTRAINT `vendre_ibfk_2` FOREIGN KEY (`idCommerce`) REFERENCES `commerce` (`id`);

ALTER TABLE `vente`
  ADD CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`idCommercant`) REFERENCES `commercant` (`id`);
