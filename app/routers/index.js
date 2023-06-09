const express = require('express');
const router = express.Router();

// controllers
const controller = require('../controllers/index.js');
const sessionController = require('../controllers/sessionController.js');
const userController = require('../controllers/userController.js');
const adminController = require('../controllers/adminController.js');

const auth = require('../models/middlewares/auth.js');
const isAdmin = require('../models/middlewares/isAdmin.js');


router.get('/api/products', controller.AllProductsPage);
router.get('/api/products/:id', controller.OneProductPage);

router.get('/api/categories', controller.AllCategoriesPage);
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);

router.post('/category/creation/add', controller.AddCategory);
router.post('/product/creation/add', controller.AddProduct);


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


