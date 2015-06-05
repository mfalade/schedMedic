angular.module('doctorServiceModule', [])
  .factory('docService', ['$http', function ($http) {
    return {
      getDoctors: function(cb) {
        $http.get('/api/v1/doctors')
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      },

      addDoctor: function (user, cb) {
        $http.post('/api/v1/doctors', user)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      }
    };

  }]);
