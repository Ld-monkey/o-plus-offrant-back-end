const express = require('express');
const router = express.Router();

// controllers
const controller = require('../controllers/index.js');
const jwtController = require('../controllers/jwtcontroller.js');

const auth = require('../models/middlewares/auth.js');


// const sessionController = require('../controllers/sessionController.js'); //!! obsolète 
// const userController = require('../controllers/userController.js'); //!! obsolète
// const adminController = require('../controllers/adminController.js'); //!! obsolète

// const isAdmin = require('../models/middlewares/isAdmin.js'); //!! obsolète


// routes des articles-----------------------------------------------------------------------------------------
//router.get('/api/products', controller.AllProductsPage);                      // affiche tous les articles
router.get('/api/products/:id', controller.OneProductPage);                   // affiche un article grâce à son id
router.post('/product/creation/add', controller.AddProduct);                  // ajoute un article depuis un JSON
router.patch('/product/:id/modify', controller.AddProduct);                   // A MODIFIER !! modifie un article grâce à son id et depuis un JSON 
router.delete('/product/:id/delete', controller.DeleteProduct);               // A MODIFIER !!! supprime un article grâce grâce son id
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);   // affiche tous les produits d'une catégorie 


// routes des categories-----------------------------------------------------------------------------------------
router.get('/api/categories', controller.AllCategoriesPage);                  // affiche toutes les catégories
router.post('/category/creation/add', controller.AddCategory);                // ajoute une catégorie depuis un JSON


//!! LOGIN  JWT test-----------------------------------------------------------------------------------------------

// routes des users et jwt-----------------------------------------------------------------------------------------
router.get('/api/products', auth, controller.AllProductsPage);                       // affiche tous les articles SI porteur d'un accessToken valide //!! repris de plus haut pour test
router.post('/api/users', jwtController.addUser);                             // ajoute un utilisateur avec mot de passe crypté à la BDD

router.post('/login', jwtController.login);                                   // identifie un utilisateur via email et mot de passe crypté depuis la BDD
router.post('/refresh-token', jwtController.refreshToken);                    // rafraichi le refreshToken du porteur et passe en nouveau accessToken et refreshToken

//!! LOGIN  JWT test-----------------------------------------------------------------------------------------------




// LOGIN OLD --------------------------------------------------------------------------

// Affichage page formulaire de login
//!!router.get('/login', sessionController.index); // envoie vers la page de login FRONT
//!!router.post('/login', controller.login); // démarre la session user si user existe
//router.get('/logout', sessionController.logout);



// Affichage page formulaire register
//!!router.get('/register', userController.index);  // envoie vers la page de login FRONT
//!!router.post('/register', userController.register); // create user

/* // user profile avec middleware
router.get('/profile', auth, userController.show);
// admin avec chained middlewares
router.get('/dashboard', [auth, isAdmin], adminController.index); */ 


module.exports = router;


