var User = require('./../models/user');

module.exports = {
  getUsers: function (req, res) {
    User.find(function(err, doc) {
      if(err) 
        res.send('An error occured');
      res.json(doc);
    });
  },
  getUser: function (req, res) {
    var user_id = req.params.id;
    User.findById(user_id, function(err, doc){
      if(err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      res.json(doc);
    });
  },

  addUser: function (req, res) {
    var user       = new User();
    user.firstname = req.body.firstname;
    user.lastname  = req.body.lastname;
    user.username  = req.body.username;
    user.email     = req.body.email; 
    user.password  = req.body.password;
    user.role      = req.body.role;
    user.save(function(err){
      if (err) {
        if (err.code === 11000)
          return res.json({ error: { message: "User already exists.", code: 9010 } });
        else 
          return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      }
      else
        res.json("User successfully added");
    });
  },

  editUser: function (req, res) {
    var user_id = req.params.id;
    User.findById(user_id, function (err, user) {
      if (err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      else
        if(req.body.firstname) user.firstname = req.body.firstname;
        if(req.body.lastname) user.lastname   = req.body.lastname;
        if(req.body.username) user.username   = req.body.username;
        if(req.body.email) user.email         = req.body.email;
        if(req.body.password) user.password   = req.body.password;
        if(req.body.role) user.role           = req.body.role;

        user.save(function(err, doc) {
          if(err)
            return res.json({ error: { message: "An unidentified error occured.", code: 9000 } });
          else
            res.json("User details updated.");
        });
    });
  },

  deleteUser: function(req, res) {
    var user_id = req.params.id;
    console.log(user_id + "is about to be deleted");
    User.remove({_id: user_id}, function(err, user) {
      if(err)
        return res.json({ error: { message: "An undefined error occured", code: 9000} });
      else
        res.json({ success: {message: true, code: 200 } });
    });
  }
};