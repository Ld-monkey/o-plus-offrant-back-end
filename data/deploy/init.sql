-- SQLBook: Code
-- Deploy o-resto:init to pg
BEGIN;


-- Article ( id_article, nom, photo, description, prix_de_depart, date_de_fin, montant, date_et_heure, #id_utilisateur_vente, #id_utilisateur_achat )
-- Utilisateur ( id_utilisateur, adresse_mail, nom, prenom, mot_de_passe )
-- Categorie ( id_categorie, nom)
-- Favoris ( id_favoris, #id_utilisateur, #id_article )
-- Encherir ( id_encherir, montant, date, #id_utilisateur, #id_article )
-- Categorie_article ( #id_categorie, #id article )


DROP TABLE IF EXISTS "article", "utilisateur", "categorie", "encherir", "categorie_article";

CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE TABLE IF NOT EXISTS "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "prix_de_depart" DECIMAL NOT NULL,
    "date_de_fin" TIMESTAMPTZ NOT NULL,
    "montant" DECIMAL NOT NULL,
    "date_et_heure" TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE IF NOT EXISTS "utilisateur" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "adresse_mail" email NOT NULL UNIQUE, 
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "categorie" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "encherir" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "montant" DECIMAL,
    "date" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "categorie_article" (
    "categorie_id" INT NOT NULL REFERENCES "categorie" ("id"),
    "article_id" INT NOT NULL REFERENCES "article" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- insertion des clés étrangères
ALTER TABLE "article" 
   ADD COLUMN "utilisateur_vente_id" INT NOT NULL REFERENCES "utilisateur" ("id"),
   ADD COLUMN "utilisateur_achat_id" INT NOT NULL REFERENCES "utilisateur" ("id"),
   ADD COLUMN "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   ADD COLUMN "updated_at" TIMESTAMPTZ;

ALTER TABLE "encherir" 
   ADD COLUMN "utilisateur_id" INT NOT NULL REFERENCES "utilisateur" ("id"),
   ADD COLUMN "article_id" INT NOT NULL REFERENCES "article" ("id"),
   ADD COLUMN "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   ADD COLUMN "updated_at" TIMESTAMPTZ;

COMMIT;
