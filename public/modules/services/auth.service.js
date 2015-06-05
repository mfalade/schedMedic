angular.module('authServiceModule', [])
  .factory('authService', ['$http', function ($http) {
    return {
      signUpUser: function(newUser, cb) {
        $http.post('/api/v1/users/signup', newUser)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err)
          })
      },

      LogUserIn: function (user, cb) {
        $http.post('/api/v1/users/authenticate', user)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      }
    };
  }]);
