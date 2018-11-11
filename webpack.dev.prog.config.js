const path = require("path");
const commonConfig = require("./webpack.config");

module.exports = [
  Object.assign({
    mode: "development",
    target: "electron-main",
    devtool: "inline-source-map",
    entry: { prog: path.join(__dirname, "src", "Startup.ts") }
  }, commonConfig),
];