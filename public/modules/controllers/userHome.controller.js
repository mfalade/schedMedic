angular.module('userHomeModule', ['authtokenModule', 'scheduleServiceModule'])
  .controller('userHomeCtrl', ['$scope', 'scheduleService', 'Auth', function($scope, scheduleService, Auth) {
    Auth.getUser(function(doc) {
      $scope.currentUser = doc;
      scheduleService.getPatientSchedules($scope.currentUser._id, function (doc) {
        $scope.userSchedules = doc;
        console.log($scope.userSchedules);
      });
    });

  }]);