const path = require("path");

const commonConfig = {
  output: {
    path: path.resolve(__dirname, "app"),
    filename: "[name].js"
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   enforce: "pre",
      //   loader: "tslint-loader",
      //   options: {
      //     typeCheck: true,
      //     emitErrors: true
      //   }
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json", ".node"],
  },
  externals: {
    "node-hid": "commonjs node-hid"
  }
};

module.exports = commonConfig;