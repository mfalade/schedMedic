angular.module('scheduleModule', ['scheduleServiceModule', 'authtokenModule'])
  .controller('scheduleCtrl', ['$scope', '$rootScope', 'scheduleService', 'Auth', function($scope, $rootScope, scheduleService, Auth) {
    $('select').material_select();
    $scope.schedule = {};
    $scope.schduleFixed = false;

    //Get the currrent user id as this would be needed when the schedule is to be stored..Fetch later user_id
    Auth.getUser(function(doc) {
      $scope.currentUser = doc;
    });

    $scope.scheduleThis = function() {
      $scope.schedule.doctor_id      = $scope.scheduledDoctor._id;
      $scope.schedule.doctorEmail    = $scope.scheduledDoctor.email;
      $scope.schedule.doc_firstname  = $scope.scheduledDoctor.firstname;
      $scope.schedule.doc_lastname   = $scope.scheduledDoctor.lastname;
      $scope.schedule.patient_id     = $scope.currentUser._id;
      $scope.schedule.patientName    = $scope.currentUser.firstname + ' ' + $scope.currentUser.lastname;
      $scope.schedule.startTime      = $scope.schedule.startHour + ':' + $scope.schedule.startMinute + ' ' + $scope.schedule.startTimeOfDay;
      $scope.schedule.endTime        = $scope.schedule.endHour + ':' + $scope.schedule.endMinute + ' ' + $scope.schedule.endTimeOfDay;
      scheduleService.createSchedule($scope.schedule, function(doc) {
        if(doc.code === 2000)  {
          $scope.schduleFixed = true;
        }
        else
          console.log(doc);
      });
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