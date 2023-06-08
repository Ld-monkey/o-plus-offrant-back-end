const client = require('./client');

const dataMapper = {
  async AllProducts() {
    const result = await client.query(`SELECT * FROM "article"`);
    return result.rows;
  },

  async getOneProduct(id){
    // Ecriture de la requête
    const preparedQuery = `SELECT * FROM article
    WHERE "id" = $1`

    const values = [id];
    // Utilisation
    const result = await client.query(preparedQuery, values);

    // console.log(result);
    // Je renvoie le bon résultat
    const product = result.rows[0];
    // si product alors je le renvoie
    // sinon j'ai undefined (falsy) et je renvoie null
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
    // Effectuez la requête dans la base de données pour récupérer les produits
    const preparedQuery = `
      SELECT article.nom AS article, categorie_article.categorie_id, categorie.nom AS categorie
      FROM article
      JOIN categorie_article ON categorie_article.article_id = article.id
      JOIN categorie ON categorie.id = categorie_article.categorie_id
      WHERE categorie_article.categorie_id = $1`;
    const values = [id];
    const result = await client.query(preparedQuery, values);

    // Renvoyez les résultats
    return result.rows;
  },

/*   async AddOneCategory(nom) {
    // Effectuez la requête dans la base de données pour récupérer les produits
    const preparedQuery = `INSERT INTO "categorie"(nom)VALUES ($1);`;
    const values = [nom];
    const result = await client.query(preparedQuery, values);

    // Renvoyez les résultats
    return result.rows;
  }, */


  async AddOneCategory(JSON) {
    //const JSON = {"nom":"Nouvelle categorie"};
    const preparedQuery = {
      text: 'INSERT INTO "categorie" ("nom") VALUES ($1) RETURNING *',
      values: [JSON],
    };
    const newCategory = await client.query(preparedQuery);
    return newCategory.rows[0];
  }


/*   async AddOneProduct(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id) {
    // Effectuez la requête dans la base de données pour récupérer les produits
    const preparedQuery = `
    INSERT INTO article(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const values = [nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id];
    const result = await client.query(preparedQuery, values);

    // Renvoyez les résultats
    return result.rows;
  } */
};

module.exports = dataMapper;
