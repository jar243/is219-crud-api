const express = require("express")
const cors = require("cors")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

// MIDDLEWARE

const requireAuth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.send("You must be authenticated to perform this action")
  }
}

// CONSTANTS

const accessTokens = {}
const users = [
  {
    username: "johnrezk",
    // This is the SHA256 hash for value of `password`
    password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
  },
]

// EXPRESS SETUP

const PORT = process.env.SERVER_PORT || 8080

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const accessToken = req.cookies["AccessToken"]
  req.user = accessTokens[accessToken]
  next()
})

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
)

app.set("view engine", "hbs")

// API ROUTERS

const treeRouter = require("./tree.router")
app.use("/api/trees", requireAuth, treeRouter)

const authRouter = require("./auth")(users, accessTokens)
app.use("/api/auth", authRouter)

// HOME PAGE

app.get("/", function (req, res) {
  res.render("home")
})

// REGISTRATION CODE

app.get("/register", (req, res) => {
  res.render("register")
})

// LOGIN CODE

app.get("/login", (req, res) => {
  res.render("login")
})

// PROTECTED PAGE WITH MIDDLEWARE

app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard")
})

// START SERVER

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
