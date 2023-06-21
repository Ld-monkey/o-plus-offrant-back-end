-- SQLBook: Code

BEGIN;

-- deleting tables if they already exist before creating them
DROP TABLE IF EXISTS "article", "utilisateur", "categorie", "encherir", "categorie_article";

-- domain creation for email-addresses validation
CREATE DOMAIN "email" AS text
CHECK(
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

-- tables creation
CREATE TABLE IF NOT EXISTS "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT,
    "prix_de_depart" FLOAT NOT NULL,
    "date_de_fin" TIMESTAMPTZ NOT NULL,
    "montant" FLOAT,
    "date_et_heure" TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE IF NOT EXISTS "utilisateur" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse_mail" email NOT NULL UNIQUE,
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
    "montant" FLOAT,
    "date" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "categorie_article" (
    "categorie_id" INT NOT NULL REFERENCES "categorie" ("id"),
    "article_id" INT NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- foreignkeys and created_at/updated_at columns insertions
ALTER TABLE "article" 
   ADD COLUMN "utilisateur_vente_id" INT NOT NULL REFERENCES "utilisateur" ("id") ON DELETE CASCADE,
   ADD COLUMN "utilisateur_achat_id" INT REFERENCES "utilisateur" ("id") ON DELETE CASCADE,
   ADD COLUMN "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   ADD COLUMN "updated_at" TIMESTAMPTZ;

ALTER TABLE "encherir" 
   ADD COLUMN "utilisateur_id" INT NOT NULL REFERENCES "utilisateur" ("id") ON DELETE CASCADE,
   ADD COLUMN "article_id" INT NOT NULL REFERENCES "article" ("id") ON DELETE CASCADE,
   ADD COLUMN "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   ADD COLUMN "updated_at" TIMESTAMPTZ;

COMMIT;
