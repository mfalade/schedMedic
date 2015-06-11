angular.module('authModule', ['authServiceModule', 'authtokenModule'])
  .controller('authCtrl', function($scope, $rootScope, authService, Auth, $location, $timeout) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.userExists = false;
    $scope.wrongUserInfo = false;
    $scope.verificationMailSent = false;

    $scope.signUpUser = function (newUser) {
      $scope.userExists = false;
      authService.signUpUser(newUser, function(doc) {
        if(doc[0] != undefined)
          if(doc[0].status === 'sent')
            $scope.verificationMailSent = true;
        else
          if(doc.error.code === 9010)
            console.log('This user exists');
            $scope.userExists = true;
      });
    };

    $scope.loginUser = function(user) {
      $scope.wrongUserInfo = false;
      Auth.login(user, function(doc) {
        if(doc.token) {
          $scope.loginSuccessful = true;
          $timeout(function() {
            $scope.loginSuccessful = false;
            $location.path('/patient/home');
          }, 500);
        }
        else {
          $scope.wrongUserInfo = true;
          $timeout(function() {
            $scope.wrongUserInfo = false;
          }, 3000);
          if(doc.error.code === 9020)
            $scope.errMsg = 'A user with this username does not exist.';
          if(doc.error.code === 9090)
            $scope.errMsg = 'Incorrect password.';
        }
      });
      //Auth.login(user);
    };

  });