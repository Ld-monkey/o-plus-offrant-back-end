const express = require('express');
const controller = require('../controllers/index.js')

const router = express.Router();

router.get('/api/products', controller.AllProductsPage);
router.get('/api/products/:id', controller.OneProductPage);

router.get('/api/categories', controller.AllCategoriesPage);
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);

module.exports = router;


