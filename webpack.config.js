const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};
