const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const cookieParser = require('cookie-parser') //載入cookie-parser
router.use(cookieParser('hello'))
const selectName = {
  name: "餐廳名稱",
  category: '餐廳類別',
  location: '餐廳地區'
}

router.get('/', (req, res) => {
  const userId = req.user._id
  //重新進入頁面清除cookie
  res.clearCookie('option')
  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => res.render('error'))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  let option = req.signedCookies.option
  if (!option) {
    option = `name`
  }
  return Restaurant.find({ [option]: { $regex: `${keyword}`, $options: 'i' }, userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword, selectName: selectName[option] }))
    .catch(error => res.render('error'))
})

router.get('/search/:options', (req, res) => {
  const userId = req.user._id
  const options = req.params.options
  //設定cookie名稱、參數、屬性
  res.cookie('option', options, { httpOnly: true, signed: true })
  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants, selectName: selectName[`${options}`] }))
    .catch(error => res.render('error'))
})

router.get('/sort', (req, res) => {
  const keys = Object.keys(req.query)
  const values = Object.values(req.query)
  const userId = req.user._id
  const selectSort = {
    nameasc: 'A -> Z',
    namedesc: 'Z -> A',
    categoryasc: '類別',
    locationasc: '地區'
  }
  const option = req.signedCookies.option
  Restaurant.find({ userId })
    .lean()
    .sort({ [keys]: values })
    .then(restaurants => res.render('index', { restaurants, selectSort: selectSort[keys + values], selectName: selectName[option] }))
    .catch(error => res.render('error'))
})

module.exports = router