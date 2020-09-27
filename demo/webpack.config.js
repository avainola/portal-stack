// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [path.resolve('demo/index.tsx')],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  module: {
    rules:[
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
          ]   
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'index.html')
  })]
}