angular.module('doctorModule', ['scheduleServiceModule'])
  .controller('doctorCtrl', ['$scope', function($scope) {
    $scope.currentDoctorId = "557865621a81f3030020491f";
    $scope.activeClass = 'doc_cancelled'; // This is to add the red background color by default

    $scope.getDoctorSchedules = function (doc_id) {

    }();


    $scope.showCategory = function(param) {
      console.log('This is the current category: ', param);
      $scope.activeClass = 'doc_' + param;
    };

  }]);