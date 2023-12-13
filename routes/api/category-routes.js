const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(categories);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const categories = await Category.findByPk(req.params.id,{
      include: [{model:Product}],
    });
    if (!categories) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }
    res.status(200).json(categories);
  }catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const categories = await Category.update({
      category_name: req.body.category_name,
    },{
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({ message: 'Update succesfully'})

  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const categories = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({ message: 'Category deleted'})
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
