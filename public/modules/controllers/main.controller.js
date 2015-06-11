angular.module('mainModule', ['authtokenModule'])
  .controller('mainCtrl', function($scope, $rootScope, $location, Auth, $timeout) {
    $scope.showSignup = function() {
      $location.path('/signup');
    }
    
    $scope.getUser = function() {
      Auth.getUser(function(doc) {
        $scope.currentUser = doc;
      });
    };
    $scope.getUser();
    $scope.userIsLoggedIn = Auth.isLoggedIn();

    $scope.logout = function() {
      Auth.logout();
      $scope.userIsLoggedIn = false;
      $timeout(function() {
        $location.path('/');
      }, 500);
    };

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      $scope.userIsLoggedIn = Auth.isLoggedIn();
      if (!$scope.userIsLoggedIn && !toState.isAccess) {
        $location.path('/login');
      }
    });
  });