var webpack = require('webpack');

var config = require('./webpack.config');
var WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
  publicPath: '/',
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/rest/*": "http://localhost:8082",
    "/oauth/*": "http://localhost:8082"
  }
}).listen(7070, 'localhost', function (err, result) {
  if (err) { console.log(err) }
  console.log('Listening at localhost:7070');
});
