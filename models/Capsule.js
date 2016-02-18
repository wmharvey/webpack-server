const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Capsule = new Schema({
  description: {
    type: String,
    require: true
  },
  season: {
    type: String,
    require:true
  },
  tops: [{type: Number, ref: 'Clothes'}],
  bottoms: [{type: Number, ref: 'Clothes'}],
  accessories: [{type: Number, ref: 'Clothes'}],
  shoes: [{type: Number, ref: 'Clothes'}]
});

module.exports = mongoose.model('Capsule', Capsule);
