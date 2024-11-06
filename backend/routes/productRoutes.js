const express = require('express');
const Product = require('../models/Product.js');
const router = express.Router();

// GET: /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});

// GET: /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the product' });
  }
});

// POST: /api/products
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
});

// PUT: /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Modified!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the product' });
  }
});

// DELETE: /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product' });
  }
});

module.exports = router;
