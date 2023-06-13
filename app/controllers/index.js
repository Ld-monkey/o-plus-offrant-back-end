const dataMapper = require("../models/datamapper");

const mainController = {
  // demande tous les articles
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

  // demande un article
  async OneProductPage(req, res) {
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

  // demande toutes les catégories
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

  // demande tous les articles d'une catégorie
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

  // demande l'ajout d'une catégorie
  async AddCategory(req, res) {
    try {
      const category = await dataMapper.AddOneCategory(req.body.nom);
      res.json({ status : 'success', data : category });
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande l'ajout d'un article
  async AddProduct(req, res) {
    try {
        const { nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id } = req.body;
        const product = await dataMapper.AddOneProduct(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, utilisateur_vente_id);
        res.json({ status : 'success', data : product });
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande la suppression d'un article
  async DeleteProduct(req, res) {
    const id = Number(req.params.id);
    try {
        const deleteProduct = await dataMapper.DeleteOneProduct(id);
        res.status(200).json(`L'article avec l'ID n°${id} a bien été supprimé`);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  }, 

};


module.exports = mainController;
