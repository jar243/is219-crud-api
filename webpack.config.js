const path = require("path")
const NodemonPlugin = require("nodemon-webpack-plugin")
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/server.js",
  mode: "development",
  optimization: {
    minimize: false,
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  plugins: [new NodemonPlugin()],
}
