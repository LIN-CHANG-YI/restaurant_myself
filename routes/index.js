const express = require('express')
const home = require('./models/home')
const restaurant = require('./models/restaurants')
const search = require('./models/search')
const sort = require('./models/sort')

const router = express.Router()

router.use('/', home)
router.use('/restaurants', restaurant)
router.use('/search', search)
router.use('/sort', sort)

module.exports = router