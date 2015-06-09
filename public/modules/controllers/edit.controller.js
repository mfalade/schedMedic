angular.module('editModule', ['tempStoreModule', 'scheduleServiceModule'])
  .controller('editCtrl', ['$scope','tempStore', 'scheduleService', function ($scope, tempStore, scheduleService) {
    $scope.scheduleUpdated = false;
    $scope.scheduleCancelled= false;
    $scope.loadEntries = function () {
      $scope.currentAppointment = tempStore.currentAppointment;
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
          console.log(doc);
      });
    };

    $scope.cancelAppointment = function () {
      $scope.currentAppointment.status = 'cancelled';
      $scope.scheduleCancelled= true;
      scheduleService.updateSchedule($scope.currentAppointment._id, $scope.currentAppointment, function(doc) {
        console.log(doc);
      });
    };

  }]);