var Doctor = require('./../models/doctor');

module.exports = {
  addDoctor: function(req, res) {
      var doctor               = new Doctor();
      doctor.firstname         = req.body.firstname;
      doctor.lastname          = req.body.lastname;
      doctor.email             = req.body.email; 
      doctor.specialization    = req.body.specialization; 
      doctor.avatarUrl         = req.body.avatarUrl;  

      doctor.save(function(err){
        if (err) {
          if (err.code === 11000)
            return res.json({ error: { message: "Doctor already exists.", code: 9010 } });
          else 
            return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
        }
        else
          res.json({ success: true, code: 2000, message: 'Doctor successfully added' });
      });
    },

  getDoctors: function(req, res) {
    Doctor.find(function(err, doc) {
      if(err) 
        res.send('An error occured');
      res.json(doc);
    });
  },

  getDoctor: function(req, res) {
    var doctor_id = req.params.id;    
    Doctor.findById(doctor_id, function(err, doc){
      if(err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      res.json(doc);
    });
  }, 

  editDoctor: function (req, res) {
    var doctor_id = req.params.id;
    Doctor.findById(doctor_id, function (err, user) {
      if (err)
        return res.json({ error: { message: "An unidentified error occured", code: 9000 } });
      else
        if(req.body.firstname) user.firstname             = req.body.firstname;
        if(req.body.lastname) user.lastname               = req.body.lastname;
        if(req.body.email) user.email                     = req.body.email;
        if(req.body.specialization) user.specialization   = req.body.specialization;
        if(req.body.avatarUrl) user.avatarUrl             = req.body.avatarUrl;

        user.save(function(err, doc) {
          if(err)
            return res.json({ error: { message: "An unidentified error occured.", code: 9000 } });
          else
            res.json("Doctor details updated.");
        });
    });
  },

  deleteDoctor: function(req, res) {
    var doctor_id = req.params.id;
    Doctor.remove({_id: doctor_id}, function(err, user) {
      if(err)
        return res.json({ error: { message: "An undefined error occured", code: 9000} });
      else
        res.json({ success: {message: true, code: 200 } });
    });
  }

};