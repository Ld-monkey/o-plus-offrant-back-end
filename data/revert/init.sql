
BEGIN;

-- domain deletion
DROP DOMAIN "email" CASCADE;

-- tables deletion
DROP TABLE "article", "utilisateur", "categorie", "encherir", "categorie_article";

COMMIT;
