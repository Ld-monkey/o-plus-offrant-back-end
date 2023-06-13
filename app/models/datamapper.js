const client = require('./client');

const dataMapper = {
  // affiche tous les articles de la BDD
  async AllProducts() {
    const result = await client.query(`SELECT * FROM "article"`);
    return result.rows;
  },

  // affiche un article d'après son id
  async getOneProduct(id){
    const preparedQuery = `SELECT * FROM article
    WHERE "id" = $1`
    const values = [id];
    const result = await client.query(preparedQuery, values);
    const product = result.rows[0];

    const historicPreparedQuery = `SELECT DISTINCT "encherir"."montant", "utilisateur_id", "article_id", "date", "utilisateur"."prenom", "utilisateur"."nom" 
    FROM "encherir"
    JOIN "utilisateur" ON "utilisateur"."id" = "encherir"."utilisateur_id"
    JOIN "article" ON "article"."utilisateur_achat_id" = "utilisateur"."id"
    WHERE "encherir"."article_id" = $1`
    const histValues = [id];
    const histResult = await client.query(historicPreparedQuery, histValues);
    const histProduct = histResult.rows;
    const productPage = {product, histProduct}
    
    if(productPage){
      return productPage;
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

  // affiche tous les produits d'une catégorie donnée via son id
  async getProductsByCategoryId(id) {
    const preparedQuery = `
      SELECT article.nom AS article, categorie_article.categorie_id, categorie.nom AS categorie
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
  async AddOneProduct(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'INSERT INTO "article" ("nom", "photo", "description", "prix_de_depart", "date_de_fin", "date_et_heure", "utilisateur_vente_id") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id],
    };
    const newProduct = await client.query(preparedQuery);
    return newProduct.rows[0];
  },

  // supprime un article de la BDD
  async DeleteOneProduct(id) {
    const preparedQuery = {
      text: 'DELETE FROM "article" WHERE "id" = $1',
      values: [id],
    };
    const deleteProduct = await client.query(preparedQuery);
    if(deleteProduct.rowCount === 1) {
      return console.log("Delete succesful");
    } throw new Error("Delete failed");
    
  },

  // obtenir un utilisateur via son email
  async getOneUserByEmail(email){
    const preparedQuery = `SELECT * FROM utilisateur
    WHERE "adresse_mail" = $1`
    const values = [email];
    const result = await client.query(preparedQuery, values);
    const user = result.rows[0];
    if(user){
      return user;
    }
    else {
      return null;
    }
  }

};

module.exports = dataMapper;
