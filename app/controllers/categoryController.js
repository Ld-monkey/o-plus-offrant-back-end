const dataMapper = require("../models/datamapper");

const categoryController = {

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
};


module.exports = categoryController;
