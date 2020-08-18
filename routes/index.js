const express = require('express')
const home = require('./models/home')
const restaurant = require('./models/restaurants')
const users = require('./models/users')
const auth = require('./models/auth')
const { authenticator } = require('../middleware/auth')

const router = express.Router()

router.use('/restaurants', authenticator, restaurant)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router