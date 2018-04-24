const path = require('path');
config = {
   entry: './main.js',
	
   output: {
       path: path.join(__dirname, '/'),
       filename: 'index.js',
   },
    
  devServer: {
    historyApiFallback: true,
    proxy: { // proxy URLs to backend development server
        '/rest/*': 'http://localhost:8082/',
        '/oauth/*': 'http://localhost:8082/'
      },
      inline: true,
      port: 7070
   },
	
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
}

module.exports = config;