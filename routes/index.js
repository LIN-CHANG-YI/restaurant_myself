const express = require('express')
const home = require('./models/home')
const restaurant = require('./models/restaurants')

const router = express.Router()

router.use('/', home)
router.use('/restaurants', restaurant)

module.exports = router