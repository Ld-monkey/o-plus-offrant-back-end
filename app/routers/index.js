const express = require('express');
const router = express.Router();

// controllers
const controller = require('../controllers/index.js');
const sessionController = require('../controllers/sessionController.js');
const userController = require('../controllers/userController.js');
const adminController = require('../controllers/adminController.js');

const auth = require('../models/middlewares/auth.js');
const isAdmin = require('../models/middlewares/isAdmin.js');

// routes des articles
router.get('/api/products', controller.AllProductsPage);                      // affiche tous les articles
router.get('/api/products/:id', controller.OneProductPage);                   // affiche un article grâce à son id
router.post('/product/creation/add', controller.AddProduct);                  // ajoute un article depuis un JSON
router.patch('/product/:id/modify', controller.AddProduct);                   // A MODIFIER !! modifie un article grâce à son id et depuis un JSON 
router.delete('/product/:id/delete', controller.DeleteProduct);                  // A MODIFIER !!! supprime un article grâce grâce son id
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);   // affiche tous les produits d'une catégorie 


// routes des categories
router.get('/api/categories', controller.AllCategoriesPage);                  // affiche toutes les catégories
router.post('/category/creation/add', controller.AddCategory);                // ajoute une catégorie depuis un JSON



// LOGIN --------------------------------------------------------------------------

// Affichage page formulaire de login
router.get('/login', sessionController.index); // envoie vers la page de login FRONT
router.post('/login', controller.login); // démarre la session user si user existe
//router.get('/logout', sessionController.logout);



// Affichage page formulaire register
router.get('/register', userController.index);  // envoie vers la page de login FRONT
router.post('/register', userController.register); // create user

/* // user profile avec middleware
router.get('/profile', auth, userController.show);
// admin avec chained middlewares
router.get('/dashboard', [auth, isAdmin], adminController.index); */ 


module.exports = router;


