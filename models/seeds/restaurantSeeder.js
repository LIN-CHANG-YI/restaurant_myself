const Restaurant = require('../restaurant')
const restaurant_list = require('../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  const results = restaurant_list.results
  for (let i = 0; i < results.length; i++) {
    Restaurant.create(results[i])
  }
  console.log('done!')
})
