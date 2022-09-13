const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
  //localhost:3000/api/v1/products?
  let filter = {};
  if (req.query.category) {
    filter = { category: request.query.category.split(',') };
  }

  let productList = await Product.find(filter).populate('category');

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get('/:productId', async (req, res) => {
  let product = await Product.findById(req.params.productId).populate(
    'category'
  );

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(`/`, async (req, res) => {
  let category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  let product = new Product({
    name: req.body.name,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });

  product = await product.save();

  if (!product) return res.status(500).send('The product cannot be created');

  res.send(product);
});

router.put('/:productId', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.productId)) {
    res.status(400).send('Invalid Product ID');
  }

  let category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send('Invalid Category');

  let product = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      price: req.body.price,
      description: req.body.description,
    },
    { new: true }
  );

  if (!product) return res.status(500).send('The product cannot be updated!');

  res.send(product);
});

router.delete('/:productId', (req, res) => {
  Product.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: 'The product is deleted!' });
      } else {
        return res.status(404).json({ success: false });
      }
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error: error });
    });
});

router.get(`/get/count`, async (req, res) => {
  let productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({ productCount: productCount });
});

module.exports = router;
