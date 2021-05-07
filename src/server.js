const express = require("express")
const exphbs = require("express-handlebars")

const PORT = process.env.SERVER_PORT || 8080

const app = express()

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
)

app.set("view engine", "hbs")

const treeRouter = require("./tree.router")
app.use("/api/trees", treeRouter)

app.get("/", function (req, res) {
  res.render("home")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.get("/login", (req, res) => {
  res.render("login")
})

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
