const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, removeCartItem } = require('../controllers/cartcontroller');
const auth = require('../middleware/authmiddleware');

router.use(auth);

router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeCartItem);

module.exports = router;
