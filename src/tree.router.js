const express = require("express")
const Tree = require("./tree.model")

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

router.get("/", async (req, res) => {
  res.json({ data: await Tree.getAll() })
})

router.get("/:treeId", async (req, res) => {
  const id = req.params.treeId
  if (isNaN(id)) {
    res.status(400).send("Invalid treeId param")
    return
  }

  const row = await Tree.findById(id)
  if (row === null) {
    res.status(404).send("Not found")
    return
  }
  res.json({ data: row })
})

router.post("/", async (req, res) => {
  const queryNames = ["girth", "height", "volume"]
  const vals = getQueryVals(req, queryNames)
  const tree = new Tree(vals[0], vals[1], vals[2])
  res.json({ data: await tree.create() })
})

router.put("/:treeId", async (req, res) => {
  const id = req.params.treeId
  if (isNaN(id)) {
    res.status(400).send("Invalid treeId param")
    return
  }

  const queryNames = ["girth", "height", "volume"]
  const vals = getQueryVals(req, queryNames)

  const tree = new Tree(vals[0], vals[1], vals[2])

  const success = await Tree.update(id, tree)
  if (success) {
    res.status(200).send("Success")
  } else {
    res.status(404).send("Nothing updated")
  }
})

router.delete("/:treeId", async (req, res) => {
  const id = req.params.treeId
  if (isNaN(id)) {
    res.status(400).send("Invalid treeId param")
    return
  }
  const success = await Tree.delete(id)
  if (success) {
    res.status(200).send("Success")
  } else {
    res.status(404).send("Nothing deleted")
  }
})

module.exports = router
