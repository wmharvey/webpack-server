const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);
const Clothes = new Schema({
  capsule: {type: Schema.Types.ObjectId, ref: 'Capsule'},
  type: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require:true
  },
  url: {
    type: String,
    require: true
  },
  image: String,
  importance: {
    type: Number,
    require: true
  }
});

Clothes.plugin(autoIncrement.plugin, { model: 'Clothes', field: '_id' });

module.exports = mongoose.model('Clothes', Clothes);
