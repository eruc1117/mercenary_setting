const express = require('express')
const methodOverride = require('method-override')
const sassMiddleware = require('node-sass-middleware')
const session = require('express-session')
const flash = require('connect-flash')
const { getUser } = require('./helpers/auth-helpers')
const handlebars = require('express-handlebars')
const path = require('path')
const routes = require('./routes')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const PORT = 3000
const app = express()

// 註冊 Handlebars 樣板引擎，並指定副檔名為 .hbs
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarsHelpers }))
// 設定使用 Handlebars 做為樣板引擎
app.set('view engine', 'hbs')

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: false
}))
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
  })
)
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(flash())
app.use(passport.initialize()) // 增加這行，初始化 Passport
app.use(passport.session())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = getUser(req)
  next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}!`)
})
