/*
 * Edit schedule controller
 * 
 * @description edit schedule controller
 * @methods: loadEntries: to load the current schedule information for modification
 */



angular.module('editModule', ['tempStoreModule', 'scheduleServiceModule', 'formValidationModule'])
  .controller('editCtrl', ['$scope','tempStore', 'scheduleService', '$timeout', 'formValidator',  function ($scope, tempStore, scheduleService, $timeout, formValidator) {
    $scope.scheduleUpdated   = false;
    $scope.scheduleCancelled = false;
    $scope.newCurrentAppointment = {}; 
    $scope.formIsValid       = true;
    $scope.loadEntries = function () {
      $scope.currentAppointment = tempStore.currentAppointment;
      console.log($scope.currentAppointment);
      scheduleService.getDoctor($scope.currentAppointment.doctor_id, function(doc) {
        $scope.scheduledDoctor = doc;
      });
    }
    $scope.loadEntries();

    $scope.updateChanges = function() {
      var formValidationResult       = formValidator.validateScheduleForm($scope.currentAppointment);
      $scope.formErrorMessage        = formValidationResult.remark;
      $scope.formIsValid             = formValidationResult.validForm;

      if($scope.formIsValid) {
        $scope.currentAppointment.message     = $scope.newCurrentAppointment.message || $scope.currentAppointment.message;
        $scope.currentAppointment.SelectedDay = $scope.newCurrentAppointment.SelectedDay || $scope.currentAppointment.SelectedDay;
        $scope.currentAppointment.status      = 'pending';
        scheduleService.updateSchedule($scope.currentAppointment._id, $scope.currentAppointment, function(doc) {
          if(doc.code === 2222) {
            $scope.scheduleUpdated = true;
          }
          else
            $scope.formIsValid = false;
            $scope.formErrorMessage = "An error occured. Please try again later";
            $timeout(function() {
              $scope.formIsValid = true;
            }, 2000);
        });
      }
      $timeout(function() {
        $scope.formIsValid = true;
      }, 2000);
    };

    $scope.cancelAppointment = function () {
      var cancelForReal = confirm('Are you sure you want to cancel this appointment?')
      if(cancelForReal) {
        $scope.currentAppointment.status = 'cancelled';
        scheduleService.updateSchedule($scope.currentAppointment._id, $scope.currentAppointment, function(doc) {
          $scope.scheduleCancelled= true;
        });
      }
      else 
        return false;
    };

  }]);