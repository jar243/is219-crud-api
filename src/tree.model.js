const pool = require("./mysql")

class Tree {
  constructor(girth, height, volume) {
    for (let i in arguments) {
      let arg = arguments[i]
      if (isNaN(arg)) {
        throw new Error("Query value is not a number")
      }
    }
    this.id = null
    this.girth = parseFloat(girth)
    this.height = parseFloat(height)
    this.volume = parseFloat(volume)
  }

  toObject(includeId) {
    let d = {
      girth: this.girth,
      height: this.height,
      volume: this.volume,
    }
    if (includeId === true && this.id !== null) {
      d.id = this.id
    }
    return d
  }

  async create() {
    const [rows, fields] = await pool.query(
      "INSERT INTO trees SET ?;",
      this.toObject()
    )
    this.id = rows.insertId
    return this.toObject(true)
  }

  static async getAll() {
    const [rows, fields] = await pool.query("SELECT * FROM trees")
    const data = []
    for (let i in rows) {
      let row = rows[i]
      let tree = new Tree(row.girth, row.height, row.volume)
      tree.id = row.id
      data.push(tree.toObject(true))
    }
    return data
  }

  static async findById(id) {
    const [rows, fields] = await pool.query(
      "SELECT * FROM trees WHERE id = ?",
      id
    )
    if (rows.length < 1) {
      return null
    }
    let row = rows[0]
    let tree = new Tree(row.girth, row.height, row.volume)
    tree.id = row.id
    return tree.toObject(true)
  }

  static async update(id, tree) {
    let res = await pool.query(
      "UPDATE trees SET girth = ?, height = ?, volume = ? WHERE id = ?;",
      [tree.girth, tree.height, tree.volume, id]
    )
    return res[0].affectedRows > 0
  }

  static async delete(id) {
    let res = await pool.query("DELETE FROM trees WHERE id = ?;", id)
    return res[0].affectedRows > 0
  }
}

module.exports = Tree
