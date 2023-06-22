const express = require('express');
const router = express.Router();

// Controllers-------------------------------------------------------------------------------------------------
const controller = require('../controllers/index.js');
const userController = require('../controllers/userController.js');

// Middleware d'authorisation----------------------------------------------------------------------------------
const auth = require('../models/middlewares/auth.js');
const { registerUser, loginUser, addArticle, updateArticle, auction, updateProfile } = require('../validations/schemas.js')
const validate = require('../validations/validate.js');




// routes des articles-----------------------------------------------------------------------------------------

router.get('/api/articles', controller.AllArticlesPage);
router.get('/api/article/:id', controller.OneArticlePage);
router.post('/article/creation/add', validate(addArticle, 'body'), controller.AddArticle);   //! TODO penser rajouter le middleware d'autorisation après tests
router.patch('/article/:id/update', validate(updateArticle, 'body'), controller.UpdateArticle);                               //! TODO penser rajouter le middleware d'autorisation après tests
/* router.post('/api/article/images', controller.AddImage); */

router.delete('/article/:id/delete', controller.DeleteArticle);                              // supprime un article grâce grâce son id //! TODO penser rajouter le middleware d'autorisation après tests
router.get('/api/category/:id/articles', controller.ArticlesOfOneCategory);                  // affiche tous les produits d'une catégorie 


// routes des categories-----------------------------------------------------------------------------------------
router.get('/api/categories', controller.AllCategoriesPage);                                 // affiche toutes les catégories
router.post('/category/creation/add', controller.AddCategory);                               // ajoute une catégorie depuis un JSON //! TODO penser rajouter le middleware d'autorisation après tests


// Login et autorisations-----------------------------------------------------------------------------------------
router.get('/api/users', auth, userController.AllUsers);                                      // route TEST : affiche tous les utilisateurs SI porteur d'un accessToken valide
router.post('/api/register', validate(registerUser, 'body'),userController.AddUser);          // ajoute un utilisateur avec mot de passe crypté à la BDD
router.post('/api/login', validate(loginUser, 'body'), userController.Login);                 // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/api/refresh-token', userController.RefreshToken);                               // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken //! TODO fonction à vérifier
router.get('/api/profile/:id', userController.OneProfilePage);                                // affiche des informations pour la page profil d'un utilisateur
router.patch('/api/profile/:id/update', validate(updateProfile, 'body'), userController.UpdateProfile);                            // modifie les informations de la page profil d'un utilisateur
router.delete('/api/profile/:id/delete', userController.DeleteProfile);                           // supprime le profil d'un utilisateur


//router.get('/api/logout', jwtController.Logout);                                             // déconnecte l'utilisateur coté client ? //! a voir avec le front


// Route du bouton enchérir---------------------------------------------------------------------------------------
router.post('/api/auction', validate(auction, 'body'), controller.Auctioning);               // Ajoute le montant en cliquant sur le bouton enchérir

module.exports = router;
