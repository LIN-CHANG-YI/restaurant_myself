const express = require('express')
const home = require('./models/home')
const restaurant = require('./models/restaurants')
const search = require('./models/search')

const router = express.Router()

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/search', search)

module.exports = router