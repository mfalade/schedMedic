angular.module('editModule', ['tempStoreModule', 'scheduleServiceModule'])
  .controller('editCtrl', ['$scope','tempStore', 'scheduleService', function ($scope, tempStore, scheduleService) {
    $scope.loadEntries = function () {
      $scope.currentAppointment = tempStore.currentAppointment;
      scheduleService.getDoctor($scope.currentAppointment.doctor_id, function(doc) {
        $scope.scheduledDoctor = doc;
        console.log($scope.currentAppointment);
        console.log(doc);
      });
        
    }
    $scope.loadEntries();
  }]);