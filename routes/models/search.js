const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser') //載入cookie-parser
const Restaurant = require('../../models/restaurant')
router.use(cookieParser()) //

router.get('/', (req, res) => {
  const selectName = {
    name: "餐廳名稱",
    category: '餐廳類別',
    location: '餐廳地區'
  }
  const keyword = req.query.keyword
  let option = req.cookies.option
  if (!option) {
    option = `name`
  }
  return Restaurant.find({ [option]: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword, selectName: selectName[option] }))
    .catch(error => console.log(error))
})

router.get('/:options', (req, res) => {
  const options = req.params.options
  const selectName = {
    name: "餐廳名稱",
    category: '餐廳類別',
    location: '餐廳地區'
  }
  //設定cookie名稱、參數、屬性
  res.cookie('option', options, { httpOnly: true })
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, selectName: selectName[`${options}`] }))
    .catch(error => console.log(error))
})

module.exports = router