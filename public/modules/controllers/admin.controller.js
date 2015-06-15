/**
 * Admin controller
 *
 * @description Admin controller to add doctor
 */

angular.module('adminModule', ['doctorServiceModule'])
  .controller('adminCtrl', ['$scope', 'docService', function ($scope, docService) {

    $scope.addAnotherDoc = function (arg) {
      $scope.doctorAdded = false;
    };

    $scope.addDoctor = function (arg) {
      console.log(arg)
      docService.addDoctor(arg, function(msg) {
        console.log(msg);
        if(msg.code === 2000)
          $scope.doctorAdded = true;
        else
          console.log('an error occured');
      })
    }
  }]);