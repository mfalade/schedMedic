var email  = require('./email.server.controller');
var uniqid = require('uniqid');
var User   = require('./../models/user');

module.exports = {
  addnewUser: function(req, res) {
    var unique_id      = uniqid();
    var validationUrl  = 'https://schedmedic.herokuapp.com/api/v1/users/verify/q?code=' + unique_id + '&username=' + req.body.username;
    var user           = new User();
    user.firstname     = req.body.firstname;
    user.lastname      = req.body.lastname;
    user.username      = req.body.username;
    user.email         = req.body.email; 
    user.password      = req.body.password;
    user.uniqueId      = unique_id;
    user.validationUrl = validationUrl;
    user.save(function(err){
      if (err) {
        if (err.code === 11000)
          return res.json({ error: { message: "User already exists.", code: 9010 } });
        else 
          return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      }
      else
        email.sendVerificationMail(res, user);
    });
  },
};