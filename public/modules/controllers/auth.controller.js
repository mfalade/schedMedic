angular.module('authModule', ['authServiceModule', 'authtokenModule'])
  .controller('authCtrl', function($scope, $rootScope, authService, Auth, $location) {
    $scope.newUser = {};
    $scope.user = {};
    $scope.userExists = false;
    $scope.wrongUsername = false;
    $scope.invalidPassword = false;
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
      $scope.wrongUsername = false;
      $scope.invalidPassword = false;
      Auth.login(user, function(doc) {
        if(doc.token) {
          $scope.getUser();
          $rootScope.userIsLoggedIn = true;
          $location.path('/patient/home');
        }
        else {
          if(doc.error.code === 9020)
            $scope.wrongUsername = true;
          if(doc.error.code === 9090)
            $scope.invalidPassword = true;
        }
      });
      //Auth.login(user);
    };

    $scope.getUser = function() {
      Auth.getUser(function(doc) {
        $rootScope.currentUser = doc;
        return doc;
      });
    };

  });