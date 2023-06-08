const express = require('express');
const controller = require('../controllers/index.js')

const router = express.Router();

router.get('/api/products', controller.AllProductsPage);
router.get('/api/products/:id', controller.OneProductPage);

router.get('/api/categories', controller.AllCategoriesPage);
router.get('/api/category/:id/products', controller.ProductsOfOneCategory);

router.post('/category/creation/add', controller.AddCategory);
router.post('/product/creation/add', controller.AddProduct);


module.exports = router;


