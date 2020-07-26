const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

router.get('/:key/:value', (req, res) => {
  const selectName = '選擇'
  const selectSort = {
    nameasc: 'A -> Z',
    namedesc: 'Z -> A'
  }
  const key = req.params.key
  const value = req.params.value
  return Restaurant.find()
    .lean()
    .sort({ [key]: value })
    .then(restaurants => res.render('index', { restaurants, selectSort: selectSort[`${key}${value}`], selectName }))
    .catch(error => console.log(error))
})

module.exports = router