const path = require("path")
const NodemonPlugin = require("nodemon-webpack-plugin")

module.exports = {
  entry: "./src/server.js",
  target: "node",
  mode: "development",
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  plugins: [new NodemonPlugin()],
}
