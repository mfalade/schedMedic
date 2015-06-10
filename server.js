'use strict';

var express        = require('express');
var app            = express();
var db             = require('./config/db');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var env            = process.env.NODE_ENV || 'development';
var port           = process.env.PORT || 5555;

if( env === 'development') {
  mongoose.connect(db.developmentUrl);
  console.log('This is the db url', db.developmentUrl);
}
else {
  mongoose.connect(db.productionUrl);
  console.log('This is the db url', db.productionUrl);
}

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 
app.get('/', function(req, res) {
  res.sendfile('public/modules/views/index.html');
});
require('./app/routes')(app, express);
app.listen(port, function(err) {
  if (err) {
    console.log('Could not start app: Error Occured', err)
  } else {
    console.log(port + ' is where the magic happens.');
  }
  
});


exports = module.exports = app;

