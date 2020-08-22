const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const passport = require('passport')
const router = express.Router()


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '帳號與密碼皆必須填寫' })
  } else if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼必須相同' })
  } else if (password.length < 8) {
    errors.push({ message: '密碼長度至少8位數' })
  }
  if (errors.length) {
    return res.render('register', { errors, name, email, password, confirmPassword })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此帳號已有人註冊' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ name, email, password: hash }))
        .then(() => res.redirect('/users/login'))
        .catch(err => res.render('error'))
    })
    .catch(err => res.render('error'))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出')
  return res.redirect('/users/login')
})

module.exports = router