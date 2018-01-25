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
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
    // alias: {
    //   'react$': path.join(__dirname, 'node_modules', 'react', 'dist', 'react.min.js'),
    //   'react-dom$': path.join(__dirname, 'node_modules', 'react-dom', 'dist', 'react-dom.min.js'),
    //   'redux$': path.join(__dirname, 'node_modules', 'redux', 'dist', 'redux.min.js'),
    //   'react-redux$': path.join(__dirname, 'node_modules', 'react-redux', 'dist', 'react-redux.min.js')
    // }
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