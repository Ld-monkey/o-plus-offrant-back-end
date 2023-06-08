const client = require('./client');

const dataMapper = {
  async AllProducts() {
    const result = await client.query(`SELECT * FROM "article"`);
    return result.rows;
  },

  async getOneProduct(id){
    const preparedQuery = `SELECT * FROM article
    WHERE "id" = $1`

    const values = [id];
    const result = await client.query(preparedQuery, values);
    const product = result.rows[0];
    if(product){
      return product;
    }
    else {
      return null;
    }
  },

  async AllCategories() {
    const result = await client.query(`SELECT * FROM "categorie"`);
    return result.rows;
  },

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

  async AddOneCategory(nom) {
    const preparedQuery = {
      text: 'INSERT INTO "categorie" ("nom") VALUES ($1) RETURNING *',
      values: [nom],
    };
    const newCategory = await client.query(preparedQuery);
    return newCategory.rows[0];
  },

  async AddOneProduct(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id) {
    const preparedQuery = {
      text: 'INSERT INTO "article" ("nom", "photo", "description", "prix_de_depart", "date_de_fin", "date_et_heure", "utilisateur_vente_id") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id],
    };
    const newProduct = await client.query(preparedQuery);
    return newProduct.rows[0];
  }

};

module.exports = dataMapper;
