const path = require("path");
const commonConfig = require("./webpack.config");

module.exports = [
  Object.assign({
    mode: "production",
    target: "electron-main",
    entry: { prog: path.join(__dirname, "src", "Startup.ts") }
  }, commonConfig),
];