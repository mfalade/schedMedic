var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var bcrypt        = require('bcrypt-nodejs');
var PatientSchema = new Schema({
  firstname: { type: String, required: true },
  lastname:  { type: String, required: true },
  email:     { type: String, required: true },
  password:  { type: String, required: true, select: false }
});

PatientSchema.pre('save', function(next) {
  var patient = this;
  //Hash the password only if the password has been changed or the user is new
  if(!user.isModified('password')) return next();
  bcrypt.hash(patient.password, null, null, function(err, hash) {
    if (err) return next(err);
    // Change the password to the hashed version
    patient.password = hash;
    next();
  });
});

PatientSchema.methods.comparePassword = function (password) {
  var patient = this;
  if (typeof (password) == 'undefined') {
    return false;
  }
  return bcrypt.compareSync(password, patient.password);
}

// return the model
module.exports = mongoose.model('Patient', PatientSchema);
