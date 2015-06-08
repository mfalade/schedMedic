angular.module('patientModule', ['doctorServiceModule'])
  .controller('patientCtrl', ['$scope', '$rootScope', 'docService', '$location', function($scope, $rootScope, docService, $location) {
    $scope.day = moment();
    angular.element('.datepicker').trigger('click');
    $('.datepicker').pickadate({
      selectMonths: true, 
      selectYears: 15 
    });

    $scope.bookAppointment = function(arg) {
      $rootScope.bookedDoctor = arg;
      $location.path('/schedule-appointment');
    };

    $scope.getDoctors = function() {
      docService.getDoctors(function(doc) {
        $scope.doctors = doc;
      })
    };

    $scope.getDoctors(); 
  }]);