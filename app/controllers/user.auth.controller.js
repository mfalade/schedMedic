var jwt            = require('jsonwebtoken');
var api_secret_key = "mysupersecretkey";
var User           = require('./../models/user');


module.exports = {
  authenticateUser: function (req, res) {
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
  }
}