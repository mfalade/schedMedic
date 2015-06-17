/*
 * Schedule controller
 *
 * @description
 * Controller for CRUDing a schedule
 * @dependences
 * ['scheduleServiceModule', 'authtokenModule', 'formValidationModule']
 */


angular.module('scheduleModule', ['scheduleServiceModule', 'authtokenModule', 'formValidationModule'])
  .controller('scheduleCtrl', ['$scope', '$rootScope', 'scheduleService', 'Auth', 'formValidator', '$timeout', function($scope, $rootScope, scheduleService, Auth, formValidator, $timeout) {
    $('select').material_select();
    $scope.schedule         = {};
    $scope.schduleFixed     = false;
    $scope.formIsValid      = true;

    //Get the currrent user information as this would be needed when the schedule is to be stored.

    Auth.getUser(function(doc) {
      $scope.currentUser = doc;
    });

    $scope.validateForm = function(schedule) {
      return formValidator.validateForm(schedule);
    };

    // Schedule the current schedule
    $scope.scheduleThis = function() {
      $scope.schedule.doctor_id      = $scope.scheduledDoctor._id;
      $scope.schedule.doctorEmail    = $scope.scheduledDoctor.email;
      $scope.schedule.doc_firstname  = $scope.scheduledDoctor.firstname;
      $scope.schedule.doc_lastname   = $scope.scheduledDoctor.lastname;
      $scope.schedule.patient_id     = $scope.currentUser._id;
      $scope.schedule.patientName    = $scope.currentUser.firstname + ' ' + $scope.currentUser.lastname;
      var formValidationResult       = $scope.validateForm($scope.schedule)
      $scope.formErrorMessage        = formValidationResult.remark;
      $scope.formIsValid             = formValidationResult.validForm;
      if($scope.formIsValid) {
        scheduleService.createSchedule($scope.schedule, function(doc) {
          if(doc.code === 2000)  {
            $scope.schduleFixed = true;
          }
          else
            console.log(doc);
        });
      }
      else {
        $timeout(function() {
          $scope.formIsValid = true;
        }, 2000);
      }
    }; 

    $scope.getSchedule = function () {
      scheduleService.getSchedules(function (doc) {
      });
    } 

    scheduleService.getDoctor($rootScope.bookedDoctor, function(result) {
      $scope.scheduledDoctor = result;
    });
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }]);