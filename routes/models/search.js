const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
let currentMode

router.get('/', (req, res) => {
  const selectName = {
    name: "名稱",
    category: '類別',
    location: '地區'
  }
  const keyword = req.query.keyword
  if (currentMode === undefined) {
    return res.redirect('/')
  }
  console.log(currentMode)
  return Restaurant.find({ [currentMode]: { $regex: `${keyword}`, $options: 'i' } })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword, selectName: selectName[`${currentMode}`] }))
    .catch(error => console.log(error))
})

router.get('/:options', (req, res) => {
  const options = req.params.options
  const selectName = {
    name: "名稱",
    category: '類別',
    location: '地區'
  }
  currentMode = options
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants, selectName: selectName[`${options}`] }))
    .catch(error => console.log(error))
})

module.exports = router