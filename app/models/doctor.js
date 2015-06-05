var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var bcrypt        = require('bcrypt-nodejs');
var DoctorSchema = new Schema({
  firstname:      { type: String, required: true },
  lastname:       { type: String, required: true },
  email:          { type: String, required: true },
  specialization: { type: String, required: true },
  avatarUrl:      { type: String, required: true }
});

module.exports = mongoose.model('doctor', DoctorSchema);
