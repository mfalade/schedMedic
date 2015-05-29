'use strict';

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');

var db = require('./config/db');
mongoose.connect(db.url); 

var port = process.env.port || 5555;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 
require('./app/routes')(app, express);
app.listen(port);


console.log(port + ' is where the magic happens.');

exports = module.exports = app;
