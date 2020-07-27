const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()
const cookieParser = require('cookie-parser') //載入cookie-parser
router.use(cookieParser())

router.get('/:key/:value', (req, res) => {
  const selectName = {
    name: "餐廳名稱",
    category: '餐廳類別',
    location: '餐廳地區'
  }
  const selectSort = {
    nameasc: 'A -> Z',
    namedesc: 'Z -> A',
    categoryasc: '類別',
    locationasc: '地區'
  }
  const key = req.params.key
  const value = req.params.value
  const option = req.cookies.option
  return Restaurant.find()
    .lean()
    .sort({ [key]: value })
    .then(restaurants => res.render('index', { restaurants, selectSort: selectSort[`${key}${value}`], selectName: selectName[option] }))
    .catch(error => console.log(error))
})

module.exports = router