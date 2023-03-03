const path = require('path')
const bmodule = require('./wpmodule/bmodule.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry:{
		index: ['./src/js/index.js'],  
	},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins:[
	  new HtmlWebpackPlugin({
	         template: './src/index.html',
	         filename: 'index.html',
	         chunk: ['index']
	       }),
  ],
  module:bmodule
}