
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

-- requête pour récupérer les articles vendus par un utilisateur d'après son id (attention article avec enchere NULL absent)
SELECT "utilisateur"."nom", "utilisateur"."prenom", "article"."nom", "categorie"."nom", "article"."prix_de_depart", "article"."montant" AS "enchere actuelle"
FROM "utilisateur"
JOIN "article" ON "utilisateur"."id" = "article"."utilisateur_vente_id"
JOIN "categorie_article" ON "article"."id" = "categorie_article"."article_id"
JOIN "categorie" ON "categorie_article"."categorie_id" = "categorie"."id"
WHERE "utilisateur_vente_id" = 1;

-- Requête pour voir toutes les enchère sur les objet vendu s'il y a au moins une enchère
SELECT "utilisateur"."nom", "utilisateur"."prenom", "article"."nom", "categorie"."nom", "article"."prix_de_depart", "article"."montant" AS "enchere actuelle", "encherir"."montant"
FROM "utilisateur"
JOIN "article" ON "utilisateur"."id" = "article"."utilisateur_vente_id"
JOIN "categorie_article" ON "article"."id" = "categorie_article"."article_id"
JOIN "categorie" ON "categorie_article"."categorie_id" = "categorie"."id"
JOIN "encherir" ON "encherir"."article_id" = "article"."id"
WHERE "utilisateur_vente_id" = 1;

-- requête pour l'historique d'enchères d'un article par son id sur la page produit
SELECT DISTINCT "encherir"."montant", "utilisateur_id", "article_id", "date", "utilisateur"."prenom", "utilisateur"."nom" 
FROM "encherir"
JOIN "utilisateur" ON "utilisateur"."id" = "encherir"."utilisateur_id"
JOIN "article" ON "article"."utilisateur_achat_id" = "utilisateur"."id"
WHERE "encherir"."article_id" = 1 