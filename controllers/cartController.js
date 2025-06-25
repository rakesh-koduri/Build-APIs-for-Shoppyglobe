const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [{ productId, quantity }] });
  } else {
    const index = cart.items.findIndex(i => i.productId.equals(productId));
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
  }

  res.json(cart);
};

exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;

  const cart = await Cart.findOne({ userId });
  const item = cart.items.id(id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.removeCartItem = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const cart = await Cart.findOne({ userId });
  cart.items = cart.items.filter(item => item._id.toString() !== id);
  await cart.save();
  res.json(cart);
};
