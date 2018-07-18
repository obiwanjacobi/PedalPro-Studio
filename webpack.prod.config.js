const path = require("path");
const webpack = require("webpack");

const commonConfig = {
  output: {
    path: path.resolve(__dirname, "app"),
    filename: "[name].js"
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
  }
};

module.exports = [
    Object.assign({
        target: "electron-main",
        entry: { program: path.join(__dirname, "src", "Startup.ts") }
    }, commonConfig),
    Object.assign({
        target: "electron-renderer",
        entry: { app: path.join(__dirname, "src", "Autostart.ts") }
    }, commonConfig)
];