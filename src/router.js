const express = require("express")
const mysql = require("mysql")

function createMySqlConn() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: process.env.MYSQL_PORT || 3307,
    user: "root",
    password: "123",
    database: "is219ApiIntro",
  })
}

function getQueryVals(request, queryNames) {
  const inputVals = []

  for (let i = 0; i < queryNames.length; i++) {
    let name = queryNames[i]
    let val = request.query[name]
    if (typeof val === "undefined") {
      throw new Error("Missing query value: " + name)
    }
    if (isNaN(val)) {
      throw new Error("Query value is not a number: " + name)
    }

    inputVals.push(val)
  }

  return inputVals
}

const router = express.Router()

router.get("/", function (req, res) {
  const query = "SELECT * FROM trees;"

  const mysql = createMySqlConn()
  mysql.connect()
  mysql.query(query, function (err, result, fields) {
    if (err) throw err
    res.json({ data: result })
  })
  mysql.end()
})

router.post("/", function (req, res) {
  const query = "INSERT INTO trees(girth,height,volume) VALUES (?,?,?);"

  const queryNames = ["girth", "height", "volume"]
  try {
    const vals = getQueryVals(req, queryNames)
  } catch (err) {
    res.status(400).send(err)
    return
  }

  const mysql = createMySqlConn()
  mysql.connect()
  mysql.query(query, [vals], function (err, rows, fields) {
    if (err) throw err
    res.status(200).send("OK")
  })
  mysql.end()
})

router.put("/:treeIndex", function (req, res) {
  const query = "SELECT * FROM trees"

  const mysql = createMySqlConn()
  mysql.connect()
  mysql.query(query, function (err, rows, fields) {
    if (err) throw err
    res.status(200).send("OK")
  })
  mysql.end()
})

router.delete("/:treeIndex", (req, res) => {
  const query = "DELETE 1 FROM trees WHERE `index` is ?;"

  const queryNames = ["index"]
  try {
    const vals = getQueryVals(req, queryNames)
  } catch (err) {
    res.status(400).send(err)
    return
  }

  const mysql = createMySqlConn()
  mysql.connect()
  mysql.query(query, [vals], (err, rows, fields) => {
    if (err) throw err
    res.status(200).send("OK")
  })
  mysql.end()
})

module.exports = router
