const pool = require("./mysql")

class Tree {
  constructor(girth, height, volume) {
    for (let i in arguments) {
      let arg = arguments[i]
      if (isNaN(arg)) {
        throw new Error("Input value is not a number")
      }
    }
    this.id = null
    this.girth = girth
    this.height = height
    this.volume = volume
  }

  static async findById(id) {
    let res = await pool.query("SELECT * FROM trees WHERE id = ?", id)
    let vals = res[0]
    let tree = new Tree(vals[1], vals[2], vals[3])
    tree.id = id
    return tree
  }

  static async create(tree) {
    let res = await pool.query(
      "INSERT INTO trees(`girth`,`height`,`volume`) VALUES (?,?,?);",
      [tree.girth, tree.height, tree.volume]
    )
    tree.id = res[0].insertId
    return tree
  }

  static async save(id, tree) {
    let res = await pool.query(
      "UPDATE trees SET girth = ?, height = ?, volume = ? WHERE id = ?",
      [tree.girth, tree.height, tree.volume, id]
    )
    return res[0].affectedRows > 0
  }

  static async delete(id) {
    let res = await pool.query("DELETE FROM trees WHERE id = ?", id)
    return res[0].affectedRows > 0
  }
}

module.exports = Tree
