var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('tCl1bffzlEwIjVqWEr1MIg');
var Template = require('./../mails/verification.mail');

module.exports = {
  sendVerificationMail: function(res, user) {
    var firstname = user.firstname;
    var email     = user.email;
    var template  = Template(user);
    var message   = {
      "html": template,
      "text": "Welcome to SchedMedic",
      "subject": "Welcome to SchedMedic",
      "from_email": "noreply@SchedMedic.com",
      "from_name": "SchedMedic",
      "to": [{
        "email": email,
        "name": firstname,
        "type": "to"
      }]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        res.send(result);
    }, function(e) {
        res.send(e);
    });
  }
};