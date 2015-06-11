'use strict';

var ScheduleTemplate = function(info) {
  var info         = info;
  var mailTemplate =  '<div>' + 
                        '<p>Hi Dr ' + info.doc_firstname + ',</p>' + 
                      '</div>' + 
                      '<div>' + 
                        '<p>A new schedule request has been made by ' + info.patientName + '.</p>' + 
                      '</div>' +
                      '<div>' + 
                        '<p>The details are: </p>' + 
                      '</div>' +
                      '<ul>' + 
                        '<li>' + 'Preferred Date: ' + info.SelectedDay + '.</li>' +
                        '<li>' + 'Preferred time frame: ' + info.startTime + ' - ' + info.endTime +  '.</li>' +
                        '<li>' + 'Reason for visit: ' + info.message +  '</li>' +
                      '<ul>'+

                      '<div>' + '<br>' + 
                        '<a href="https://schedmedicherokuapp.com" style="color: green;">Confirm appointment</a>' + 
                      '</div>' +
                      '<div>' + '<br>' + 
                        '<a href="https://schedmedicherokuapp.com" style="color: red;">Cancel appointment</a>' + 
                      '</div>';
  return mailTemplate;
};

module.exports = ScheduleTemplate;