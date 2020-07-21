const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
mongoose.connect("mongodb://localhost/restaurant_list", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const image = req.body.image
  const rating = req.body.rating
  const location = req.body.rating
  const phone = req.body.phone
  const google_map = req.body.google_map
  const description = req.body.description
  return Restaurant.create({ name, category, image, rating, location, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('Express is listen on port 3000!')
})