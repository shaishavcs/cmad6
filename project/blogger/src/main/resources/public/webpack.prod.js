let path = require('path');
const optimize = require('webpack').optimize;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '/';

module.exports = {
 entry: './main.js',
 output: {
    path: path.join(__dirname, '/'),
    filename: 'index_bundle.js',
    publicPath: publicPath
    // sourceMapFilename: '[name].map'
  },

  plugins: [
	  new HtmlWebpackPlugin({
	      template: './index.html'
	  }),
	   module: {
		      loaders: [
		         {
		            test: /\.jsx?$/,
		            exclude: /node_modules/,
		            loaders: 'babel-loader',
		            query: {
		               presets: ['es2015', 'react', 'stage-0']
		            }
		         },{
		            test: /\.css?$/,
		            loader: "style-loader!css-loader"
		         },
		         { test: /\.(png|jpg|svg|mp4|ttf|eot)$/,
		            loader: 'file-loader?name=public/[name].[ext]'
		          },
		          { test: /\.woff2?$/, loader: 'file-loader?name=public/[name].[ext]' }             
		      ]
		   }

//	  new webpack.NamedModulesPlugin(),
//	  new ExtractTextPlugin('blogger.css'),
//    new webpack.LoaderOptionsPlugin({
//      minimize: true,
//      debug: false
//    }),
//    new webpack.optimize.UglifyJsPlugin({
//      beautify: false,
//      mangle: {
//        screw_ie8: true,
//        keep_fnames: true
//      },
//      compress: {
//        screw_ie8: true
//      },
//      comments: false
//    })
  ]
}