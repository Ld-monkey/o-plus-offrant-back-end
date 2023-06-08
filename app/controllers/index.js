const dataMapper = require("../models/datamapper");

const mainController = {

  async AllProductsPage(req, res) {
    try {
      const products = await dataMapper.AllProducts();
      res.send(products);
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
    
  },

  async OneProductPage(req, res) {
    // On récupère un id, potentiellement celui d'un produit
    const id = Number(req.params.id);

    try {
      const product = await dataMapper.getOneProduct(id);
        res.send(product);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  async AllCategoriesPage(req, res) {
    try {
      const categories = await dataMapper.AllCategories();
      res.send(categories);
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  async ProductsOfOneCategory(req, res) {
    const id = Number(req.params.id);

    try {
      const products = await dataMapper.getProductsByCategoryId(id);
        res.send(products);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  async AddCategory(req, res) {
    try {
      const category = await dataMapper.AddOneCategory(req.body.nom);
      res.json({ status : 'success', data : category });
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Youhou !! Error 500');
    }
  },

  async AddProduct(req, res) {
    try {
        const { nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id } = req.body;
        const product = await dataMapper.AddOneProduct(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id);
        res.json({ status : 'success', data : product });
        }
      catch(error){
        console.trace(error);
        res.status(500).send('Youhou 2 !! Error 500');
      }
    }

/*   async AddProduct(req, res) {
    //const id = Number(req.params.id);
    try {
      const product = await dataMapper.AddOneProduct();
        //res.send(product);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Youhou Error 500');
    }
  } */

};


module.exports = mainController;
