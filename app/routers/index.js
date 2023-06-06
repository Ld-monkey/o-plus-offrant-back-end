const express = require('express');
const controller = require('../controllers/index.js')

const router = express.Router();

router.get('/', controller.testPage);

module.exports = router;