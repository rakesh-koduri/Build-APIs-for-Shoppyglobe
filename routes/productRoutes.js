const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById } = require('../controllers/productcontroller');

router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
