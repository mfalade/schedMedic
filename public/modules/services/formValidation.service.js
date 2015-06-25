/**
 * @desc custom service to validate every form imput before submission
 * Returns value (true or false based on form values)
 */


angular.module('formValidationModule', [])
  .factory('formValidator', [function () {
    return {

      validateScheduleForm: function (schedule) {
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
      },

      validateAuthForm: function(newUser, typeOfAuth) {
        var notificationMsg = null;
        var validFormDetails = true;

        // This is the same form authentication method to be used for both the signup and login forms hence the typeOfAuth

        switch(typeOfAuth) {
          case 'signup':
            if(!newUser.firstname || !newUser.lastname || !newUser.username || !newUser.email || !newUser.password || /\s/g.test(newUser.password)) {
              validFormDetails = false;
              notificationMsg = "Please fill out all the required fields";
            }
            if(/\s/g.test(newUser.password)) {
              notificationMsg = "Really, that's the best password you can think of ?!";
            }
            return { validForm: validFormDetails, remark: notificationMsg };
            break;

          case 'login':
            if(!newUser.username || !newUser.password) {
              validFormDetails = false;
              notificationMsg = "Please fill out the required fields."
            }
            return { validForm: validFormDetails, remark: notificationMsg };
            break;
          default:
            return true;
        }
      }
    };
  }])