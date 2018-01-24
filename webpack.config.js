const path = require('path')

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  }
}

module.exports = [
    Object.assign({
        target: 'electron-main',
        entry: { program: './src/Startup.ts' }
    }, commonConfig),
    Object.assign({
        target: 'electron-renderer',
        entry: { app: './src/Application.tsx' },
    }, commonConfig)
]