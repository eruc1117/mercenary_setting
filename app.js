const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const PORT = 3000
const app = express()

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'scss'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
  })
)
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log('App is running!')
})
