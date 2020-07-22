const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "https://upload.cc/i1/2020/07/22/QU9vWD.png",
    required: false
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)