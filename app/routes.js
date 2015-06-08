'use strict';

var User               = require('./models/user');
var UsersController    = require('./controllers/user.server.controller');
var AuthController     = require('./controllers/user.auth.controller');
var SignupController   = require('./controllers/user.signup.controller');
var DoctorsController  = require('./controllers/doctor.server.controller');
var ScheduleController = require('./controllers/schedule.server.controller');

module.exports = function (app, express) {
  var apiRouterV1 = express.Router();
  apiRouterV1.use(function(req, res, next) {
    AuthController.middleware(req, res, next);
  });

  apiRouterV1.route('/doctors/')
    .get(function(req, res) {
      DoctorsController.getDoctors(req, res);
    });

  apiRouterV1.route('/doctors/:id')
    .get(function(req, res) {
      DoctorsController.getDoctor(req, res);
    });

  apiRouterV1.route('/doctors/:id')
    .put(function(req, res) {
      DoctorsController.editDoctor(req, res);
    });

  apiRouterV1.route('/doctors/:id')
    .delete(function(req, res) {
      DoctorsController.deleteDoctor(req, res);
    });

  apiRouterV1.route('/doctors/')
    .post(function(req, res) {
      DoctorsController.addDoctor(req, res);
    });

  apiRouterV1.route('/users/verify/:q')
    .get(function(req, res) {
      AuthController.verifyLink(req, res);
    });

  apiRouterV1.route('/schedules')
    .get(function(req, res) {
      ScheduleController.getSchedules(req, res);
    })
    .post(function(req, res) {
      ScheduleController.saveSchedule(req, res);
    });

  apiRouterV1.route('/schedules/:id')
    .get(function(req, res) {
      ScheduleController.getSchedule(req, res);
    })
    .put(function(req, res) {
      ScheduleController.editSchedule(req, res);
    })
    .delete(function(req, res) {
      ScheduleController.deleteSchedule(req, res);
    });

  apiRouterV1.route('/patient/schedules/:id')
    .get(function(req, res) {
      ScheduleController.getPatientSchedule(req, res);
    });

  apiRouterV1.route('/users/signup')
    .post(function(req, res) {
      SignupController.addnewUser(req, res);
    });

  apiRouterV1.route('/users/authenticate')
    .post(function(req, res) {
      AuthController.authenticateUser(req, res);
    });

  apiRouterV1.route('/users')
    .get(function(req, res) {
      UsersController.getUsers(req, res);
    })  
    .post(function(req, res) {
      UsersController.addUser(req, res);
    });

  apiRouterV1.route('/users/:id')
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