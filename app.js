const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
mongoose.connect("mongodb://localhost/restaurant_list", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(routes)

app.listen(3000, () => {
  console.log('Express is listen on port 3000!')
})