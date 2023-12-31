const dataMapper = require("../models/datamapper");

const mainController = {
  //demande tous les articles
  async AllArticlesPage(__, res) {
    try {
      const articles = await dataMapper.AllArticles();
      res.send(articles);
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande un article
  async OneArticlePage(req, res) {
    const id = Number(req.params.id);
    try {
      const article = await dataMapper.getOneArticle(id);
        res.send(article);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande tous les articles d'une catégorie
  async ArticlesOfOneCategory(req, res) {
    const id = Number(req.params.id);
    try {
      //renvoi tous les articles d'une catégorie
      const articles = await dataMapper.getArticlesByCategoryId(id);
      //renvoi toutes les catégrories
      const categories = await dataMapper.AllCategories();
      res.json({ status : 'success', filteredArticles : articles, allCategories : categories});
    }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande l'ajout d'un article
  async AddArticle(req, res) {
    try {
        // ajout de l'article depuis un JSON

        const nom = req.body.nom;
        const photo = `${req.file.path.split('public')[1]}`;
        const description = req.body.description;
        const prix_de_depart = req.body.prix_de_depart;
        const date_de_fin = req.body.date_de_fin;
        const date_et_heure = req.body.date_et_heure;
        const montant = req.body.montant;  
        const utilisateur_vente_id = req.body.utilisateur_vente_id;
        const categorie_id = req.body.categorie_id;


        console.log(req.body);
        console.log(req.file);
        console.log(photo);        
        const article = await dataMapper.AddOneArticle(nom, photo, description, prix_de_depart, date_de_fin, date_et_heure, montant, utilisateur_vente_id, categorie_id);
        // mise à jour de la categorie de l'article via son ID nouvellement crée
        const idCategory = categorie_id;
        const updateCategory = await dataMapper.UpdateArticleCategory(idCategory, article.id);
/*         const photo = req.file;
        const updatePhoto = await dataMapper.UpdateArticlePhoto(photo, article.id); */
        res.json({ status : 'creation and update successful', data : article, categoryLink : updateCategory })
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // demande la suppression d'un article
  async DeleteArticle(req, res) {
    const id = Number(req.params.id);
    try {
        const deleteArticle = await dataMapper.DeleteOneArticle(id);
        res.status(200).json(`L'article avec l'ID n°${id} a bien été supprimé`);
      }
    catch(error){
      console.trace(error);
      res.status(500).send('Error 500');
    }
  },

  // modifie un article
  async UpdateArticle(req, res) {
    const id = Number(req.params.id);
    try {
      const { nom, description, utilisateur_vente_id } = req.body;
      const article = await dataMapper.UpdateOneArticle(id, nom, description, utilisateur_vente_id);
      res.json({ status : 'success', data : article }); //!! TODO modifier la condition d'erreur quand l'ID n'existe pas
    }
  catch(error){
    console.trace(error);
    res.status(500).send('Error 500');
  }
 },
};


module.exports = mainController;
