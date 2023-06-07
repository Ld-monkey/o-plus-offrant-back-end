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
  }

};


module.exports = mainController;
