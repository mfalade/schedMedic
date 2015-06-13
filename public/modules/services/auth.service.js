angular.module('authServiceModule', [])
  .factory('authService', ['$http', 'options', function ($http, options) {
    return {
      signUpUser: function(newUser, cb) {
        $http.post(options.API_URL + 'users/signup', newUser)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err)
          })
      },

      LogUserIn: function (user, cb) {
        $http.post(options.API_URL + 'users/authenticate', user)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      }
    };
  }]);
