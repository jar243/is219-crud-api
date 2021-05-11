const express = require("express")
const cors = require("cors")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
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
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
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

// API ROUTERS

const treeRouter = require("./tree.router")
app.use("/api/trees", treeRouter)

// const authRouter = require("./auth")(users, accessTokens)
// app.use("/api/auth", authRouter)

// HOME PAGE

app.get("/", function (req, res) {
  res.render("home")
})

// LOGIN CODE

app.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  (req, res) => {
    res.redirect("/")
  }
)

app.get("/callback", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.redirect("/login")
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      const returnTo = req.session.returnTo
      delete req.session.returnTo
      res.redirect(returnTo || "/")
    })
  })(req, res, next)
})

// PROTECTED PAGE WITH MIDDLEWARE

app.get("/dashboard", (req, res) => {
  res.render("dashboard")
})

// START SERVER

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
