angular.module('userHomeModule', ['authtokenModule', 'scheduleServiceModule', 'tempStoreModule'])
  .controller('userHomeCtrl', ['$scope', 'scheduleService', 'Auth', 'tempStore', '$location', function($scope, scheduleService, Auth, tempStore, $location) {
    $scope.pendingAppointments = [];
    $scope.confirmedAppointments = [];
    $scope.cancelledAppointments = [];
    Auth.getUser(function(doc) {
      $scope.currentUser = doc;
      scheduleService.getPatientSchedules($scope.currentUser._id, function (doc) {
        $scope.userSchedules = doc;
        angular.forEach($scope.userSchedules, function(schedule) {
          if(schedule.status === 'pending')
            $scope.pendingAppointments.push(schedule);
          else if(schedule.status === 'confirmed')
            $scope.confirmedAppointments.push(schedule);
          else if(schedule.status === 'cancelled')
            $scope.cancelledAppointments.push(schedule);
        });
      });
    });

    $scope.editAppointment = function (param) {
      tempStore.currentAppointment = param;
      $location.path('/edit-appointment');
    };

    $scope.trashAppointment = function(param) {
      var certainty = confirm('Are you sure you want to trash this appointment?!');
      if(certainty) {
        scheduleService.deleteSchedule(param._id, function(doc) {
          scheduleService.getPatientSchedules($scope.currentUser._id, function (doc) {
            $scope.userSchedules = doc;
          });
        }); 
      }

      else {
        return false
      }
    }

  }]);