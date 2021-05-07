const express = require("express")
const exphbs = require("express-handlebars")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const crypto = require("crypto")

// AUTH-RELATED FUNCS AND VARS

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256")
  const hash = sha256.update(password).digest("base64")
  return hash
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex")
}

const authTokens = {}
const users = [
  {
    username: "johndoe",
    // This is the SHA256 hash for value of `password`
    password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
  },
]

// EXPRESS SETUP

const PORT = process.env.SERVER_PORT || 8080

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

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
    res.render("register", {
      message: "Password does not match.",
      messageClass: "alert-danger",
    })
    return
  }

  if (users.find((user) => user.username === username)) {
    res.render("register", {
      message: "Username already in use.",
      messageClass: "alert-danger",
    })
    return
  }

  const hashedPassword = getHashedPassword(password)

  users.push({
    username,
    password: hashedPassword,
  })

  res.render("login", {
    message: "Registration Complete. Please login to continue.",
    messageClass: "alert-success",
  })
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
    res.render("login", {
      message: "Invalid username or password",
      messageClass: "alert-danger",
    })
    return
  }

  const authToken = generateAuthToken()
  authTokens[authToken] = user
  res.cookie("AuthToken", authToken)
  res.redirect("/protected")
})

// START SERVER

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
