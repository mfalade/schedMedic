'use strict';

var User             = require('./models/user');
var UsersController  = require('./controllers/user.server.controller');

module.exports = function (app, express) {
  var apiRouterV1 = express.Router();
  apiRouterV1.use(function(req, res, next) {
    next();
    return;
  });

  apiRouterV1.route( '/users')
  .get(function(req, res) {
    UsersController.getUsers(req, res);
  })
  .post(function(req, res) {
    UsersController.addUser(req, res);
  });


  apiRouterV1.route( '/users/:id')
  .get(function(req, res) {
    UsersController.getUser(req, res);
  })
  .put(function(req, res) {
    UsersController.editUser(req, res);
  })
  .delete(function(req, res) {
    UsersController.deleteUser(req, res);
  });


  app.use('/api/v1', apiRouterV1);
  return app;
};