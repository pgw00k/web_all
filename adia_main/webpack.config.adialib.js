const path = require('path')
const bmodule = require('./wpmodule/bmodule.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var indexHtml = new HtmlWebpackPlugin({
	         template: './src/adialib/index.html',
	         filename: 'index.html',
			 inject: true,
			 minify: true,
			 chunks:['global','libmain','libmain_pre']
	       });

var listHtml = new HtmlWebpackPlugin({
	         template: './src/adialib/list.html',
	         filename: 'list.html',
			 inject: true,
			 minify: true,
			 chunks:['global','liblist'],
			 templateParameters: (compilation, assets, assetTags, options) => {
			         return {
			           compilation,
			           webpackConfig: compilation.options,
			           htmlWebpackPlugin: {
			             tags: {
							 bodyTags:[
								 //'<script src="js/liblist.js"></script>'
							 ]
						 },
			             files: assets,
			             options
			           },
			         };
			},
	});
	
var managerTagHtml = new HtmlWebpackPlugin({
	         template: './src/adialib/manager_tag.html',
	         filename: 'manager_tag.html',
			 inject: true,
			 minify: true,
			 chunks:['global','libmantag'],
			 templateParameters: (compilation, assets, assetTags, options) => {
			         return {
			           compilation,
			           webpackConfig: compilation.options,
			           htmlWebpackPlugin: {
			             tags: {
							 bodyTags:[
								 //'<script src="js/liblist.js"></script>'
							 ]
						 },
			             files: assets,
			             options
			           },
			         };
			},
	});

module.exports = {
	entry:{
		'global': ['./src/adialib/js/global.js'],
		'libmain_pre': ['./src/adialib/js/libmain_pre.js'],
		'libmain': ['./src/adialib/js/libmain.js'],
		'liblist': ['./src/adialib/js/liblist.js'],
		'libmantag': ['./src/adialib/js/libmantag.js']
	},
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins:[
	  indexHtml,
	  listHtml,
	  managerTagHtml,
	  new CopyWebpackPlugin(
		  [
			  {from:'./src/adialib/assets',to:path.resolve(__dirname, 'dist','assets')},
			  {from:'./src/adialib/img',to:path.resolve(__dirname, 'dist','img')}
		  ]
	  )
  ],
  module:bmodule
}