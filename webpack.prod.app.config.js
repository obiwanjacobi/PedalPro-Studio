const path = require("path");
const commonConfig = require("./webpack.config");

module.exports = [
  Object.assign({
    mode: "production",
    target: "electron-renderer",
    entry: { app: path.join(__dirname, "src", "Autostart.ts") }
  }, commonConfig)
];