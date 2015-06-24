angular.module('doctorModule', ['scheduleServiceModule'])
  .controller('doctorCtrl', ['$scope','scheduleService', function($scope, scheduleService) {
    $scope.currentDoctorId = "5571b2e2178a323925af334d";
    $scope.activeClass = 'doc_cancelled'; // This is to add the red background color by default

    $scope.getDoctorSchedules = function (doc_id) {
      scheduleService.getDoctorSchedules($scope.currentDoctorId, function(doc) {
        $scope.currentDoctorSchedules = doc;
        console.log('This is the current doctor schedules', doc);
      });
    }();


    $scope.showCategory = function(param) {
      $scope.activeClass = 'doc_' + param;
    };

  }]);