/*
 * Edit schedule controller
 * 
 * @description edit schedule controller
 * @methods: loadEntries: to load the current schedule information for modification
 */



angular.module('editModule', ['tempStoreModule', 'scheduleServiceModule'])
  .controller('editCtrl', ['$scope','tempStore', 'scheduleService', '$timeout', function ($scope, tempStore, scheduleService, $timeout) {
    $scope.scheduleUpdated = false;
    $scope.errorUpdatingSchedule = false;
    $scope.scheduleCancelled= false;
    $scope.loadEntries = function () {
      $scope.currentAppointment = tempStore.currentAppointment;
      console.log($scope.currentAppointment);
      scheduleService.getDoctor($scope.currentAppointment.doctor_id, function(doc) {
        $scope.scheduledDoctor = doc;
        $scope.currentAppointment.startHour       = parseInt($scope.currentAppointment.startTime.slice(0,2),10);
        $scope.currentAppointment.startMinute     = parseInt($scope.currentAppointment.startTime.slice(3,5),10);
        $scope.currentAppointment.startTimeOfDay  = $scope.currentAppointment.startTime.slice(6,8);
        $scope.currentAppointment.endHour         = parseInt($scope.currentAppointment.endTime.slice(0,2),10);
        $scope.currentAppointment.endMinute       = parseInt($scope.currentAppointment.endTime.slice(3,5),10);
        $scope.currentAppointment.endTimeOfDay    = $scope.currentAppointment.endTime.slice(6,8);
      });
    }
    $scope.loadEntries();

    $scope.updateChanges = function() {
      console.log($scope.currentAppointment);
      $scope.currentAppointment.startTime  = $scope.currentAppointment.startHour + ':' + $scope.currentAppointment.startMinute + ' ' + $scope.currentAppointment.startTimeOfDay;
      $scope.currentAppointment.endTime    = $scope.currentAppointment.endHour + ':' + $scope.currentAppointment.endMinute + ' ' + $scope.currentAppointment.endTimeOfDay;
      scheduleService.updateSchedule($scope.currentAppointment._id, $scope.currentAppointment, function(doc) {
        if(doc.code === 2222) {
          $scope.scheduleUpdated = true;
        }
        else
          $scope.errorUpdatingSchedule = true;
          $timeout(function() {
            $scope.errorUpdatingSchedule = false;
          }, 2000);
          console.log(doc);
      });
    };

    $scope.cancelAppointment = function () {
      var cancelForReal = confirm('Are you sure you want to cancel this appointment?')
      if(cancelForReal) {
        $scope.currentAppointment.status = 'cancelled';
        $scope.scheduleCancelled= true;
        scheduleService.updateSchedule($scope.currentAppointment._id, $scope.currentAppointment, function(doc) {
          console.log(doc);
        });
      }
      else 
        return false;
    };

  }]);