'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('tCl1bffzlEwIjVqWEr1MIg');
var VerificationTemplate = require('./../mails/verification.mail');
var ScheduleTemplate = require('./../mails/schedule.mail');

module.exports = {
  sendVerificationMail: function(res, user) {
    var firstname = user.firstname;
    var email     = user.email;
    var template  = VerificationTemplate(user);
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
  },

  sendScheduleMail: function(res, doc) {
    var docEmail = doc.doctorEmail;
    var template = ScheduleTemplate(doc);
    var message   = {
      "html": template,
      "text": "Schedule Notification",
      "subject": "Schedule Notification",
      "from_email": "notifications@SchedMedic.com",
      "from_name": "SchedMedic",
      "to": [{
        "email": docEmail,
        "type": "to"
      }]
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        res.send(result);
        console.log(result);
    }, function(e) {
        res.send(e);
        console.log(e);
    });

  }
};