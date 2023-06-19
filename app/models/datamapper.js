const { log } = require('console');
const client = require('./client');

const dataMapper = {
  //affiche tous les articles de la BDD + les catégories + les 5 dernières enchères qui arrivent à expiration
  async AllArticles() {
    // récupère tous les articles
    const articles = await client.query(`SELECT article.*, categorie.nom AS categorie_nom, categorie.id AS categorie_id
      FROM article
      JOIN categorie_article ON categorie_article.article_id = article.id
      JOIN categorie ON categorie.id = categorie_article.categorie_id`);
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
    const articlePreparedQuery = `SELECT * FROM article WHERE "id" = $1`;
    const values = [id];
    const articlesResult = await client.query(articlePreparedQuery, values);
    const article = articlesResult.rows[0];

    const categoriesResult = await client.query(`SELECT * FROM "categorie"`);
    const allCategories = categoriesResult.rows;

    const historicPreparedQuery = `SELECT DISTINCT "encherir"."id", "encherir"."montant", "utilisateur_id", "article_id", "date", "utilisateur"."prenom", "utilisateur"."nom" 
      FROM "encherir"
      JOIN "utilisateur" ON "utilisateur"."id" = "encherir"."utilisateur_id"
      JOIN "article" ON "article"."utilisateur_achat_id" = "utilisateur"."id"
      WHERE "encherir"."article_id" = $1`;
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
      SELECT article.*, article.nom AS article, categorie_article.categorie_id, categorie.nom AS categorie
      FROM article
      JOIN categorie_article ON categorie_article.article_id = article.id
      JOIN categorie ON categorie.id = categorie_article.categorie_id
      WHERE categorie_article.categorie_id = $1`;
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
  async AddOneArticle(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'INSERT INTO "article" ("nom", "photo", "description", "prix_de_depart", "date_de_fin", "date_et_heure", "utilisateur_vente_id") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id],
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
  async UpdateOneArticle(id, nom, photo, description, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'UPDATE "article" SET "nom" = $2 , "photo" = $3, "description" = $4, "utilisateur_vente_id" = $5 WHERE "id" = $1 RETURNING *',
      values: [id, nom, photo, description, utilisateur_vente_id],
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
};

module.exports = dataMapper;
