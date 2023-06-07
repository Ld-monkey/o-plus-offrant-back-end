
SELECT "article"."nom", "prix_de_depart", "montant", "utilisateur_vente_id" AS "id vendeur", "utilisateur"."prenom" AS "Prenom du vendeur", "utilisateur"."nom" AS "Nom du vendeur" FROM "article"
JOIN "utilisateur" ON "utilisateur"."id" = "article"."utilisateur_vente_id";


SELECT "nom" FROM "article" LIMIT 100 OFFSET 0;


SELECT "nom","categorie_id" FROM "article"
JOIN "categorie_article" ON "categorie_article"."article_id" = "article"."id" LIMIT 100 OFFSET 0
SELECT "nom"."article","categorie_id","nom"."categorie" FROM "article"
JOIN "categorie_article" ON "categorie_article"."article_id" = "article"."id"
JOIN "categorie" ON "categorie"."id" = "categorie_article"."categorie_id"
LIMIT 100 OFFSET 0;


SELECT "article"."nom","categorie"."nom" FROM "article"
JOIN "categorie_article" ON "categorie_article"."article_id" = "article"."id"
JOIN "categorie" ON "categorie"."id" = "categorie_article"."categorie_id"
LIMIT 100 OFFSET 0;