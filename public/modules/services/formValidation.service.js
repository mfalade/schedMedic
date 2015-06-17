/**
 * @desc custom service to validate every form imput before submission
 * Returns value (true or false based on form values)
 */


angular.module('formValidationModule', [])
  .factory('formValidator', [function () {
    return {
      validateForm: function(schedule){
        var startTime     = new Date("1/1/2015 " + schedule.startTime),
            endTime       = new Date("1/1/2015 " + schedule.endTime),
            scheduleDate  = new Date(schedule.SelectedDay);

        var notificationMessage = null;
        timeFrameIsValid    = false;

        if(!schedule.doctor_id || !schedule.doctorEmail || !schedule.doc_firstname || !schedule.doc_lastname || !schedule.patient_id || !schedule.patientName) {
          notificationMessage = 'Please retry from your home page or schedule appointments page';
        }

        else if(!schedule.message || !schedule.SelectedDay) {
          notificationMessage = "Please be sure to fill out all the fields";
        }

        else if(Date.now() > scheduleDate) {
          notificationMessage = 'Invalid date selected';
        }

        else if(!schedule.startTime || !schedule.endTime) {
          notificationMessage = 'Please select the appointment time frame';
        }

        else {
          if(startTime < endTime) {
            timeFrameIsValid = true;
          }
          else {
            notificationMessage = 'Please check and modify your time frame';
          }
        }

        //Return the final result of the form assessment.
        return { validForm: timeFrameIsValid, remark: notificationMessage };
      }
    };
  }])