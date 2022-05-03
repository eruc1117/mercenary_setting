const { User, Mercenary } = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
async function (req, email, password, done) {
  try {
    const user = await User.findOne({ where: { email }, raw: true })
    if (!user) {
      return done(null, false, req.flash('error_messages', '信箱尚未註冊！'))
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return done(null, false, req.flash('error_messages', '信箱或密碼錯誤'))
    }
    return done(null, user)
  } catch (err) {
    console.log(err)
    done(err, false)
  }
}))
passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id, cb) => {
  User.findByPk(id, {
    include: [
      { model: Mercenary, as: 'UserMercenaryUser', attributes: ['id'] }
    ]
  })
    .then(user => {
      user = user.toJSON()
      return cb(null, user)
    })
})

module.exports = passport
