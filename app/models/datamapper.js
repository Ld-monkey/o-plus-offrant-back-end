const { log } = require('console');
const client = require('./client');

const dataMapper = {
  //affiche tous les articles de la BDD + les catégories + les 5 dernières enchères qui arrivent à expiration
  async AllArticles() {
    // récupère tous les articles
    const articles = await client.query(`SELECT "article".*, "categorie"."nom" AS "categorie_nom", "categorie"."id" AS "categorie_id"
      FROM "article"
      JOIN "categorie_article" ON "categorie_article"."article_id" = "article"."id"
      JOIN "categorie" ON "categorie"."id" = "categorie_article"."categorie_id"
      WHERE "date_de_fin">NOW()`);
    const allArticles = articles.rows;
    // récupère toutes les catégories
    const result = await client.query(`SELECT * FROM "categorie"`);
    const allCategories = result.rows;
    // récupère les 5 dernières enchères
    const closingAuctions = await client.query(`SELECT * FROM "article" WHERE "date_de_fin">NOW() ORDER BY "date_de_fin" ASC LIMIT 5`)
    const lastAuctions = closingAuctions.rows;
    const homePage = {allArticles, allCategories, lastAuctions}
    if(homePage) {
      return homePage;
    }
    else {
      return null;
    }
  },

  // affiche un article d'après son id
  async getOneArticle(id){
    const articlePreparedQuery = `SELECT * FROM "article" WHERE "id" = $1`;
    const values = [id];
    const articlesResult = await client.query(articlePreparedQuery, values);
    const article = articlesResult.rows[0];

    const categoriesResult = await client.query(`SELECT * FROM "categorie"`);
    const allCategories = categoriesResult.rows;

    const historicPreparedQuery = `SELECT "encherir".*, "utilisateur"."prenom", "utilisateur"."nom"
    FROM "encherir"
    JOIN "utilisateur" ON "utilisateur"."id" = "encherir"."utilisateur_id"
    WHERE "encherir"."article_id" = $1 ORDER BY "montant" DESC`;
    const histValues = [id];
    const histResult = await client.query(historicPreparedQuery, histValues);
    const histArticle = histResult.rows;

    const articlePage = {article, allCategories, histArticle}
    
    if(articlePage){
      return articlePage;
    }
    else {
      return null;
    }
  },

  // affiche toutes les catégories de la BDD
  async AllCategories() {
    const result = await client.query(`SELECT * FROM "categorie"`);
    return result.rows;
  },

  // affiche tous les articles d'une catégorie donnée via son id
  async getArticlesByCategoryId(id) {
    const preparedQuery = `
      SELECT "article".*, "article"."nom" AS "article", "categorie_article"."categorie_id", "categorie"."nom" AS "categorie"
      FROM "article"
      JOIN "categorie_article" ON "categorie_article"."article_id" = "article"."id"
      JOIN "categorie" ON "categorie"."id" = "categorie_article"."categorie_id"
      WHERE "categorie_article"."categorie_id" = $1`;
    const values = [id];
    const result = await client.query(preparedQuery, values);
    return result.rows;
  },

  // ajouter une catégorie dans la BDD
  async AddOneCategory(nom) {
    const preparedQuery = {
      text: 'INSERT INTO "categorie" ("nom") VALUES ($1) RETURNING *',
      values: [nom],
    };
    const newCategory = await client.query(preparedQuery);
    return newCategory.rows[0];
  },

  // ajouter une article à la BDD
  //-----------------(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, montant, utilisateur_vente_id, categorie_id)
  async AddOneArticle(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, montant, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'INSERT INTO "article" ("nom", "photo", "description", "prix_de_depart", "date_de_fin", "date_et_heure", "montant", "utilisateur_vente_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, montant, utilisateur_vente_id],
    };
    const newArticle = await client.query(preparedQuery);
    return newArticle.rows[0];
  },

  // supprime un article de la BDD via son ID
  async DeleteOneArticle(id) {
    const preparedQuery = {
      text: 'DELETE FROM "article" WHERE "id" = $1',
      values: [id],
    };
    const deleteArticle = await client.query(preparedQuery);
    if(deleteArticle.rowCount === 1) {
      return console.log("Delete succesful");
    } throw new Error("Delete failed");
  },


  // modifie un article de la BDD via son ID
  async UpdateOneArticle(id, nom, description, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'UPDATE "article" SET "nom" = $2 , "description" = $3, "utilisateur_vente_id" = $4 WHERE "id" = $1 RETURNING *',
      values: [id, nom, description, utilisateur_vente_id],
    };
    const updatedArticle = await client.query(preparedQuery);
    return updatedArticle.rows[0];
  },

  // mettre à jour la catégorie d'un article dans la BDD
  async UpdateArticleCategory(idCategory, articleId) {
    const preparedQuery = {
      text: 'INSERT INTO "categorie_article" ("categorie_id", "article_id") VALUES ($1, $2) RETURNING *',
      values: [idCategory, articleId],
    };
    const newArticleCategory = await client.query(preparedQuery);
    return newArticleCategory.rows[0];
  },


  // Enchérir et mise à jour dans la base de données
  async Auctioning( prix, articleId, acheteurId ) {
    const historicQuery = {
      text: 'INSERT INTO "encherir" ("montant", "date", "article_id", "utilisateur_id") VALUES ($1, NOW(), $2, $3) RETURNING *',
      values: [prix, articleId, acheteurId],
    };
    const newAuctioning = await client.query(historicQuery);

    const updatedArticleQuery = {
        text:
        `UPDATE "article" 
         SET 
         "montant" = $1, 
         "utilisateur_achat_id" = $3,
         "date_et_heure" = NOW(),
         "date_de_fin" = CASE 
          WHEN "date_de_fin" < (NOW() + INTERVAL '2 hours') 
            THEN "date_et_heure" + INTERVAL '2 hours' 
              ELSE "date_de_fin" END 
                WHERE "id" = $2 RETURNING *`,
        values: [prix, articleId, acheteurId],
    };
      const updatedArticle = await client.query(updatedArticleQuery);
      const auctionTracer = {newAuctioning, updatedArticle}
        if(auctionTracer) {
          return auctionTracer;
        }
        else {
          return null;
        }
  },


  async getOneProfile(id){
    const profilePreparedQuery = `SELECT "id", "prenom", "nom", "adresse", "adresse_mail", "created_at", "updated_at"  FROM "utilisateur" WHERE "id" = $1`;
    const values = [id];
    const profileResult = await client.query(profilePreparedQuery, values);
    const profile = profileResult.rows[0];

    const histSellPreparedQuery = `SELECT * FROM "article"
    WHERE "utilisateur_vente_id" = $1`;
    const histSellvalues = [id];
    const histSellResult = await client.query(histSellPreparedQuery, histSellvalues);
    const histSell = histSellResult.rows;

    const histBuyPreparedQuery = `SELECT "encherir"."id", "encherir"."montant" AS "mon_enchere", "encherir"."date", "article"."id", "article"."nom", "article"."photo", "article"."description", "article"."prix_de_depart", "article"."montant" AS "enchere_actuelle", "article"."date_de_fin"
    FROM "encherir"
    JOIN "article" ON "article"."id" = "encherir"."article_id"
    WHERE "encherir"."utilisateur_id" = $1`;
    const histBuyValues = [id];
    const histBuyResult = await client.query(histBuyPreparedQuery, histBuyValues);
    const histBuy = histBuyResult.rows;

    const wonAuctionPreparedQuery = `SELECT * FROM "article" WHERE "date_de_fin" < NOW() AND "utilisateur_achat_id" = $1`;
    const wonAuctionValues = [id];
    const wonAuctionResult = await client.query(wonAuctionPreparedQuery, wonAuctionValues);
    const wonAuction = wonAuctionResult.rows;

    const profilePage = {profile, histSell, histBuy, wonAuction }
    
    if(profilePage){
      return profilePage;
    }
    else {
      return null;
    }
  },

  // modifie un profile de la BDD via son ID
  async UpdateOneProfile(id, nom, prenom, adresse, adresse_mail) {
    const preparedQuery = {
      text: 'UPDATE "utilisateur" SET "nom" = $2 , "prenom" = $3, "adresse" = $4, "adresse_mail" = $5 WHERE "id" = $1 RETURNING "id", "nom", "prenom", "adresse", "adresse_mail"',
      values: [id, nom, prenom, adresse, adresse_mail],
    };
    const updatedProfile = await client.query(preparedQuery);
    return updatedProfile.rows[0];
  },

  // supprime un profile de la BDD via son ID
  async DeleteOneProfile(id) {
    const preparedQuery = {
      text: 'DELETE FROM "utilisateur" WHERE "id" = $1',
      values: [id],
    };
    const deleteProfile = await client.query(preparedQuery);
    if(deleteProfile.rowCount === 1) {
      return console.log("Delete succesful");
    } throw new Error("Delete failed");
  },

};

module.exports = dataMapper;
