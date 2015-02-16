/**
 * A simple web server, built with Express, to serve this application.
 * @author Jeremy Neal
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.send('Hello, World!');
});

app.listen(3000);

console.log("Server started at localhost:3000...");
