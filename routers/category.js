const { Category } = require('../models/category');
const express = require('express');
const e = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get('/:categoryId', async (req, res) => {
  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    res
      .status(500)
      .json({ message: 'The category with the given ID was not found.' });
  }
  res.status(200).send(category);
});

router.post(`/`, async (req, res) => {
  var category = await new Category({
    name: req.body.name,
  });
  category = await category.save();
  if (!category) return res.status(404).send('The category cannot be created!');

  res.send(category);
});

router.put('/:categoryId', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.categoryId,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!category) return res.status(400).send('The category cannot be created!');

  res.send(category);
});

router.delete('/:categoryId', (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'The category is deleted!' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'The category is not found' });
      }
    })
    .catch((error) => {
      return res.status(400).json({ success: false, error: error });
    });
});

module.exports = router;
