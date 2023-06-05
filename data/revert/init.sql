-- SQLBook: Markup

-- SQLBook: Code
-- Deploy o-resto:init to pg
BEGIN;

DROP DOMAIN "email" CASCADE;

DROP TABLE "article", "utilisateur", "categorie", "encherir", "categorie_article";

COMMIT;
