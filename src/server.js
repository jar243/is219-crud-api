const express = require("express")
const cors = require("cors")
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const expressSession = require("express-session")
const passport = require("passport")
const Auth0Strategy = require("passport-auth0")

require("dotenv").config()

// EXPRESS SETUP

const app = express()
const PORT = process.env.SERVER_PORT || 8080

// SESSION CONFIG

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
}

// PASSPORT CONFIG

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile)
  }
)

// MIDDLEWARE

app.use(cors())
app.use(bodyParser.json())

// APP SETUP

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
)
app.set("view engine", "hbs")

app.use(expressSession(session))

passport.use(strategy)
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

const authRouter = require("./auth")
app.use("/", authRouter)

// SECURED MIDDLEWARE FUNC

const secured = (req, res, next) => {
  if (req.user) {
    return next()
  }
  req.session.returnTo = req.originalUrl
  res.redirect("/login")
}

// API ROUTERS

const treeRouter = require("./tree.router")
app.use("/api/trees", secured, treeRouter)

// HOME PAGE

app.get("/", function (req, res) {
  res.render("home")
})

// PROTECTED PAGE WITH MIDDLEWARE

app.get("/dashboard", secured, (req, res) => {
  res.render("dashboard")
})

// START SERVER

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
