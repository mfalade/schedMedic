angular.module('doctorServiceModule', [])
  .factory('docService', ['$http', 'options',function ($http, options) {
    return {
      getDoctors: function(cb) {
        $http.get(options.API_URL + '/doctors')
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      },

      addDoctor: function (user, cb) {
        $http.post(options.API_URL + '/doctors', user)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      }
    };

  }]);
