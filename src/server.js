const PORT = process.env.SERVER_PORT || 8080

const express = require("express")

const app = express()

app.use(express.static("docs"))

const treeRouter = require("./tree.router")
app.use("/api/trees", treeRouter)

app.listen(PORT, function () {
  console.log("Node server started on %s ...", PORT)
})
