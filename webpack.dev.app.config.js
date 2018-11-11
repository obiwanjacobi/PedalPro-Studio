const path = require("path");
const commonConfig = require("./webpack.config");

module.exports = [
  Object.assign({
    mode: "development",
    target: "electron-renderer",
    devtool: "inline-source-map",
    entry: { app: path.join(__dirname, "src", "Autostart.ts") }
  }, commonConfig)
];