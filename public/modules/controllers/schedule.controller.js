/*
 * Schedule controller
 *
 * @description
 * Controller for CRUDing a schedule
 * @dependences
 * ['scheduleServiceModule', 'authtokenModule', 'formValidationModule']
 */



angular.module('scheduleModule', ['scheduleServiceModule', 'authtokenModule', 'formValidationModule'])
  .controller('scheduleCtrl', ['$scope', '$rootScope', 'scheduleService', 'Auth', 'formValidation', '$timeout', function($scope, $rootScope, scheduleService, Auth, formValidation, $timeout) {
    $('select').material_select();
    $scope.schedule = {};
    $scope.schduleFixed = false;
    $scope.formIsValid = true;

    //Get the currrent user information as this would be needed when the schedule is to be stored.

    Auth.getUser(function(doc) {
      $scope.currentUser = doc;
    });

    $scope.validateForm = function(schedule) {
      return formValidation.validateForm(schedule);
    };

    // Schedule the current schedule
    $scope.scheduleThis = function() {
      $scope.schedule.doctor_id      = $scope.scheduledDoctor._id;
      $scope.schedule.doctorEmail    = $scope.scheduledDoctor.email;
      $scope.schedule.doc_firstname  = $scope.scheduledDoctor.firstname;
      $scope.schedule.doc_lastname   = $scope.scheduledDoctor.lastname;
      $scope.schedule.patient_id     = $scope.currentUser._id;
      $scope.schedule.patientName    = $scope.currentUser.firstname + ' ' + $scope.currentUser.lastname;
      $scope.schedule.startTime      = $scope.schedule.startHour + ':' + $scope.schedule.startMinute + ' ' + $scope.schedule.startTimeOfDay;
      $scope.schedule.endTime        = $scope.schedule.endHour + ':' + $scope.schedule.endMinute + ' ' + $scope.schedule.endTimeOfDay;
      $scope.formIsValid = $scope.validateForm($scope.schedule);
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