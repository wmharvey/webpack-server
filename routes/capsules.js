const router = require('express').Router();
const Capsule = require('../models/Capsule');
const mongoose = require( 'mongoose' );
const Clothes = require('../models/Clothes');

//GET all capsules
router.get('/', (req, res) => {
  Capsule.find()
  .then( capsules => {
    res.send(capsules);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//GET one capsule with all associated items
router.get('/:id', (req, res) => {
  Capsule.findById(req.params.id).populate('tops bottoms accessories shoes')
  .then( capsule => {
    res.send(capsule);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//POST a new capsule
router.post('/', (req, res) => {
  var newCapsule = new Capsule({
    description: req.body.description,
    season: req.body.season
  });
  newCapsule.save()
  .then( capsule => {
    res.send(capsule);
  })
  .catch (err => {
    res.status(500).send(err);
  })
});

//PATCH an existing capsule
router.patch('/:id', (req, res) => {
  var fields = {};
  if (req.body.season) { fields.season = req.body.season; }
  if (req.body.description) { fields.description = req.body.description; }
  Capsule.findOneAndUpdate({_id: req.params.id}, fields, {new: true})
  .then( capsule => {
    res.send(capsule);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

//DELETE an existing capsule
router.delete('/:id', (req, res) => {
  Capsule.findOneAndRemove({
    _id: req.params.id
  })
  .then( capsule => {
    res.send(capsule);
  })
  .catch( err => {
    res.status(500).send(err);
  });
});

module.exports = router;
