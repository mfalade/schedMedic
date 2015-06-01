var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var bcrypt        = require('bcrypt-nodejs');
var UserSchema = new Schema({
  firstname:      { type: String, required: true },
  lastname:       { type: String, required: true },
  username:       { type: String, required: true, index: { unique: true } },
  email:          { type: String, required: true, index: { unique: true } },
  password:       { type: String, required: true, select: false },
  role:           { type: String, default: 'patient' },
  verified:       { type: Boolean, default: false },
  uniqueId:       { type: String },
  validationUrl:  { type: String }
});

UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  var user = this;
  if (typeof (password) == 'undefined') {
    return false;
  }
  return bcrypt.compareSync(password, user.password);
}
module.exports = mongoose.model('user', UserSchema);