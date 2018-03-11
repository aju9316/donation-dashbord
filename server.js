var webpack          = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config           = require('./webpack.config');
var express          = require('express');
var app              = express();
var bodyParser       = require('body-parser');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.path,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});

// Adds support for JSON-encoded bodies used in POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
