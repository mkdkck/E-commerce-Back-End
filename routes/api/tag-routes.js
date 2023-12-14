const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tag = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as:'tag_products'},]
    });
    res.status(200).json(tag)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as:'tag_products'}]
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag)
  } catch (err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const tag = await Tag.update({
      tag_name: req.body.tag_name,
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
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({ message: 'Tag deleted'})
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
