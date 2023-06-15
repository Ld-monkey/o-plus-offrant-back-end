const express = require('express');
const router = express.Router();

// Controllers-------------------------------------------------------------------------------------------------
const controller = require('../controllers/index.js');
const jwtController = require('../controllers/jwtcontroller.js');

// Middleware d'authorisation----------------------------------------------------------------------------------
const auth = require('../models/middlewares/auth.js');


// routes des articles-----------------------------------------------------------------------------------------
router.get('/api/articles', controller.AllArticlesPage);                      // affiche tous les articles
router.get('/api/article/:id', controller.OneArticlePage);                   // affiche un article grâce à son id
router.post('/article/creation/add', controller.AddArticle);                  // ajoute un article depuis un JSON //! TODO penser rajouter le middleware d'autorisation après tests
router.patch('/article/:id/update', controller.UpdateArticle);                // modifie un article grâce à son id et depuis un JSON //! TODO penser rajouter le middleware d'autorisation après tests
router.delete('/article/:id/delete', controller.DeleteArticle);               // supprime un article grâce grâce son id //! TODO penser rajouter le middleware d'autorisation après tests
router.get('/api/category/:id/articles', controller.ArticlesOfOneCategory);   // affiche tous les produits d'une catégorie 


// routes des categories-----------------------------------------------------------------------------------------
router.get('/api/categories', controller.AllCategoriesPage);                  // affiche toutes les catégories
router.post('/category/creation/add', controller.AddCategory);                // ajoute une catégorie depuis un JSON //! TODO penser rajouter le middleware d'autorisation après tests



// Login et autorisations-----------------------------------------------------------------------------------------
router.get('/api/users', auth, jwtController.AllUsers);                       // affiche tous les utilisateurs SI porteur d'un accessToken valide
router.post('/api/register', jwtController.AddUser);                          // ajoute un utilisateur avec mot de passe crypté à la BDD
router.post('/api/login', jwtController.Login);                               // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/api/refresh-token', jwtController.RefreshToken);                // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken //! TODO fonction à vérifier


module.exports = router;
