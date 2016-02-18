const router = require('express').Router();
const Clothes = require('../models/Clothes');
const Capsule = require('../models/Capsule');
const mongoose = require( 'mongoose' );

//GET all clothing items
router.get('/', (req, res) => {
  Clothes.find()
  .then( items => {
    res.send(items);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//GET one clothing item
router.get('/:id', (req, res) => {
  Clothes.findById(req.params.id)
  .then( item => {
    res.send(item);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//POST a new clothing item
router.post('/', (req, res) => {
  var savedItem;
  var newClothing = new Clothes({
    capsule: req.body.capsule,
    type: req.body.type,
    description: req.body.description,
    url: req.body.url,
    image: req.body.image,
    importance: req.body.importance
  });
  newClothing.save()
  .then( item => {
    savedItem = item;
    return Capsule.findById(req.body.capsule);
  })
  .then( capsule => {
    capsule[req.body.type].push(savedItem._id);
    return capsule.save();
  })
  .then( capsule => {
    res.send(savedItem);
  })
  .catch (err => {
    console.log(err);
    res.status(500).send(err[0]);
  })
});

//PATCH an existing item of clothing
router.patch('/:id', (req, res) => {
  var fields = {};
  if (req.body.description) { fields.description = req.body.description; }
  if (req.body.url) { fields.url = req.body.url; }
  if (req.body.image) { fields.image = req.body.image; }
  if (req.body.importance) { fields.importance = req.body.importance; }
  Clothes.findOneAndUpdate({_id: req.params.id}, fields, {new: true})
  .then( item => {
    res.send(item);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//DELETE an existing item of clothing
router.delete('/:id', (req, res) => {
  var clothingType;
  Clothes.findOneAndRemove({_id: req.params.id})
  .then( deletedItem => {
    clothingType = deletedItem.type;
    return Capsule.findOne({_id: deletedItem.capsule});
  })
  .then( capsule => {
    capsule[clothingType].pull(req.params.id);
    return capsule.save();
  })
  .then( () => {
    res.send('successfully deleted');
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

module.exports = router;
