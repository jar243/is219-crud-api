const express = require("express")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const accessTokenSecret = "youraccesstokensecret"

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256")
  const hash = sha256.update(password).digest("base64")
  return hash
}

module.exports = (users, accessTokens) => {
  const authRouter = express.Router()

  authRouter.post("/register", (req, res) => {
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

  authRouter.post("/login", (req, res) => {
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

  return authRouter
}
