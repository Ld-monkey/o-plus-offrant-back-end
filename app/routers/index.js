const express = require('express');
const router = express.Router();

// Controllers-------------------------------------------------------------------------------------------------
const controller = require('../controllers/index.js');
const jwtController = require('../controllers/jwtcontroller.js');

// Middleware d'authorisation----------------------------------------------------------------------------------
const auth = require('../models/middlewares/auth.js');


// routes des articles-----------------------------------------------------------------------------------------
router.get('/api/products', controller.AllProductsPage);                      // affiche tous les articles
router.get('/api/products/:id', controller.OneProductPage);                   // affiche un article grâce à son id
router.post('/product/creation/add', controller.AddProduct);                  // ajoute un article depuis un JSON
router.patch('/product/:id/modify', controller.AddProduct);                   // modifie un article grâce à son id et depuis un JSON //!! A MODIFIER
router.delete('/product/:id/delete', controller.DeleteProduct);               // supprime un article grâce grâce son id //!! A COMPLETER
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);   // affiche tous les produits d'une catégorie 


// routes des categories-----------------------------------------------------------------------------------------
router.get('/api/categories', controller.AllCategoriesPage);                  // affiche toutes les catégories
router.post('/category/creation/add', controller.AddCategory);                // ajoute une catégorie depuis un JSON



// Login et autorisations-----------------------------------------------------------------------------------------
router.get('/api/users', auth, jwtController.AllUsers);                       // affiche tous les utilisateurs SI porteur d'un accessToken valide
router.post('/api/register', jwtController.AddUser);                          // ajoute un utilisateur avec mot de passe crypté à la BDD
router.post('/api/login', jwtController.Login);                                   // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/api/refresh-token', jwtController.RefreshToken);                    // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken


module.exports = router;
