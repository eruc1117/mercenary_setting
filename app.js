const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const routes = require('./routes')
const sassMiddleware = require('node-sass-middleware')
const PORT = 3000
const app = express()

// 註冊 Handlebars 樣板引擎，並指定副檔名為 .hbs
app.engine('hbs', handlebars({ extname: '.hbs' }))
// 設定使用 Handlebars 做為樣板引擎
app.set('view engine', 'hbs')

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
  })
)
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}/!`)
})
