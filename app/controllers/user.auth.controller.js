var jwt            = require('jsonwebtoken');
var api_secret_key = "mysupersecretkey";
var User           = require('./../models/user');

var AuthController = {};
  AuthController.authenticateUser = function (req, res) {
    var username = req.body.username;
    var query = User.findOne({ username: username });
    query.select("email username password");
    query.exec(function(err, user) {
      if(err)
        return res.json({ error: { message: "An error occured", code: 9000 } });
      if(!user)
        return res.json({ error: { message: "user not found", code: 9020 } });
      else if(user)
        var validpassword = user.comparePassword(req.body.password);
        if(!validpassword)
          return res.json({ error: { message: "Incorrect password", code: 9090 } });
        else {
          var token = jwt.sign(
            {
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username
            },
            api_secret_key,
            {
              expiresInMinutes: 1440
            }
          );
          return res.json({ token: token });
        }
      res.json(user); 
    });
  };

  AuthController.middleware = function(req, res, next) {
    if(req.url == '/users/signup' || req.url.slice(0, 13) == '/users/verify' || req.url == '/users/authenticate') {
      next();
      return;
    }
    else {
      var token = req.headers['x-access-token'];
      if(token) {
        jwt.verify(token, api_secret_key, function(err, decoded) {
          if(err) {
            return res.status(403).json({ error: { message: "Given token was not valid", code: 9403 } }); 
          }
          else {
            req.decoded = decoded;
            next();
          }
        });
      }
      else {
        return res.status(403).json({ error: { message: "A valid token is required", code: 9403 } });
      }
    }
  };

  AuthController.verifyLink = function(req, res) {
    var userUniqueId = req.query.code;
    var username  = req.query.username;
    var query = User.findOne({ username: username });
    query.select('username uniqueId');
    query.exec(function(err, user) {
      if(err)
        return res.json({ error: { message: "An error occured", code: 9000 } });
      if(!user)
        return res.json({ error: { message: "User not found", code: 9020 } });
      else if(user)
        if (user.uniqueId == userUniqueId) {
          user.verified = true;
          user.save(function(err, doc) {
            if(err)
              return res.json({ error: { message: "An unidentified error occured.", code: 9000 } });
            else
              return res.json({ message: 'Validation Successful', code: 2000 });;
          });
        }
        else{
          return { error: { message: "Validation failed", code: 911 } };
        }
    });
  };

module.exports = AuthController;