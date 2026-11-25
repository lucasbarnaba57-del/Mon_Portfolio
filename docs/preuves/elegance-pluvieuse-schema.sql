-- Extrait des structures CREATE/ALTER du fichier fourni, sans donnees INSERT.
-- Consultation du 25 novembre 2026 ; ce n'est pas un MCD cree par le candidat.

CREATE TABLE personne (
    idPersonne INT AUTO_INCREMENT PRIMARY KEY,
    nomPersonne VARCHAR(50) NOT NULL,
    prenomPersonne VARCHAR(50) NOT NULL,
    mailPersonne VARCHAR(100) NOT NULL UNIQUE,
    motDePasse VARCHAR(255) NOT NULL,
    estAdmin TINYINT DEFAULT 0
);

CREATE TABLE Produit (
    idProd INT AUTO_INCREMENT PRIMARY KEY,
    nomProd VARCHAR(100) NOT NULL,
    descriptionProd TEXT,
    prixUnit DECIMAL(8,2) NOT NULL,
    qteStock INT DEFAULT 0,
    imageProduit VARCHAR(255)
);

CREATE TABLE panier (
    idPersonne INT NOT NULL,
    idProd INT NOT NULL,
    quantite INT DEFAULT 1,
    PRIMARY KEY (idPersonne, idProd),
    FOREIGN KEY (idPersonne) REFERENCES personne(idPersonne),
    FOREIGN KEY (idProd) REFERENCES Produit(idProd)
);
