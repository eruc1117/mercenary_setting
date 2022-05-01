const express = require('express')
const router = express.Router()
const customize = require('../../helpers/constructor')

const home = new customize.PageCss('home')

router.get('/', (req, res) => {
  res.render('home', { cssStyle: home.css })
})

module.exports = router
