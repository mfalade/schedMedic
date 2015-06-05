angular.module('mainModule', ['authtokenModule'])
  .controller('mainCtrl', function($scope, $rootScope, $location, Auth) {
    $rootScope.logout = function() {
      Auth.logout()
      $rootScope.userIsLoggedIn = false;
      $location.path('/');
    };
  });