var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var bcrypt        = require('bcrypt-nodejs');
var DoctorSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true },
  password:  { type: String, required: true, select: false }
});

DoctorSchema.pre('save', function(next) {
  var doctor = this;
  //Hash the password only if the password has been changed or the user is new
  if(!user.isModified('password')) return next();
  bcrypt.hash(doctor.password, null, null, function(err, hash) {
    if (err) return next(err);
    // Change the password to the hashed version
    doctor.password = hash;
    next();
  });
});

DoctorSchema.methods.comparePassword = function (password) {
  var doctor = this;
  if (typeof (password) == 'undefined') {
    return false;
  }
  return bcrypt.compareSync(password, doctor.password);
}

// return the model
module.exports = mongoose.model('doctor', DoctorSchema);
