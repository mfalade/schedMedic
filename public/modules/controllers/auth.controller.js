/**
 * Auth controller
 * 
 * @description Authentication controller for signing up and login in user
 */


angular.module('authModule', ['authServiceModule', 'authtokenModule', 'formValidationModule'])
  .controller('authCtrl', function($scope, $rootScope, authService, Auth, $location, $timeout, formValidator) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.verificationMailSent = false;
    $scope.loginSuccessful = false;
    $scope.formIsValid = true;
    $scope.formErrorMessage = null;

    $scope.signUpUser = function (newUser) {
      var validationResult = formValidator.validateAuthForm(newUser, 'signup');
      if(validationResult.validForm) {
        $scope.formIsValid = true;
        authService.signUpUser(newUser, function(doc) {
          if(doc[0] != undefined)
            if(doc[0].status === 'sent')
              $scope.verificationMailSent = true;
          else
            if(doc.error.code === 9010)
              $scope.userExists = true;
              $scope.formErrorMessage = "This username is already taken";
              $scope.formIsValid = false;
        });
      }

      else {
        $scope.formErrorMessage = validationResult.remark;
        $scope.formIsValid = validationResult.validForm;
      }
      $timeout(function() {
        $scope.formIsValid = true;
      }, 3000);
    };

    $scope.loginUser = function(user) {
      var validationResult = formValidator.validateAuthForm(user, 'login')

      if(validationResult.validForm) {
        Auth.login(user, function(doc) {
          if(doc.token) {
            $scope.loginSuccessful = true;
            $timeout(function() {
              $scope.loginSuccessful = false;
              $location.path('/patient/home');
            }, 500);
          }
          else {
            $scope.formIsValid = false;
            $timeout(function() {
              $scope.formIsValid = true;
            }, 3000);
            if(doc.error.code === 9020)
              $scope.formErrorMessage = 'A user with this username does not exist.';
            if(doc.error.code === 9090)
              $scope.formErrorMessage = 'Incorrect password.';
          }
        });
        //Auth.login(user);
      }

      else {
        $scope.formErrorMessage = validationResult.remark;
        $scope.formIsValid = validationResult.validForm;
      }
      
      $timeout(function() {
        $scope.formIsValid = true;
      }, 3000);     
      
    };

  });