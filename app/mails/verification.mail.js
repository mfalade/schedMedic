'use strict';

var Template = function(user) {
  var user = user;
  var mailTemplate =  '<div>' + 
                        '<p>Hi ' + user.username + ',</p>' + 
                      '</div>' + 
                      '<div>' + 
                        '<p>Thank you for signin up on SchedMedic</p>' + 
                      '</div>' + 
                      '<div>' + 
                        '<a href="' + user.validationUrl + '">Click this link to activate your account.</a>' + 
                      '</div>' + 
                      '<div>' +
                        '<p>Regards</p>' + 
                      '</div>';
  return mailTemplate;
};

module.exports = Template;