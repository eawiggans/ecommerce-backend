const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCats = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const cat = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!cat) {
      res.status(404).json({message: 'No category found with that id'});
      return;
    } 
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const cat = await Category.create(req.body);
    res.status(200).json(cat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const cat = await Category.update({
      where: {
        id: req.params.id
      }
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cats = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!cats) {
      res.status(404).json({message: 'No category found with that id'});
      return;
    }

    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
