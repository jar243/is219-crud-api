const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

// AUTH-RELATED FUNCS AND VARS

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256")
  const hash = sha256.update(password).digest("base64")
  return hash
}

const requireAuth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.send("You must be authenticated to perform this action")
  }
}

const accessTokenSecret = "youraccesstokensecret"
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

// BACKEND API

const treeRouter = require("./tree.router")
app.use("/api/trees", treeRouter)

// HOME PAGE

app.get("/", function (req, res) {
  res.render("home")
})

// REGISTRATION CODE

app.get("/register", (req, res) => {
  res.render("register")
})

app.post("/register", (req, res) => {
  const { username, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    res.send("Password does not match")
    return
  }

  if (users.find((user) => user.username === username)) {
    res.send("Username already in use")
    return
  }

  const hashedPassword = getHashedPassword(password)

  users.push({
    username,
    password: hashedPassword,
  })

  res.json({ username })
})

// LOGIN CODE

app.get("/login", (req, res) => {
  res.render("login")
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  const hashedPassword = getHashedPassword(password)

  const user = users.find((u) => {
    return u.username === username && hashedPassword === u.password
  })

  if (!user) {
    res.send("Invalid username or password")
    return
  }

  const accessToken = jwt.sign(user.username, accessTokenSecret)
  accessTokens[accessToken] = user
  res.cookie("AccessToken", accessToken)
  res.json({ accessToken })
})

// PROTECTED PAGE WITH MIDDLEWARE

app.get("/protected", requireAuth, (req, res) => {
  res.render("protected")
})

// START SERVER

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
