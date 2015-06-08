angular.module('scheduleServiceModule', [])
  .factory('scheduleService', ['$http', 'options', function($http, options) {
    return {
      getDoctor: function(param, cb) {
        $http.get(options.API_URL + '/doctors/' + param)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          });  
      },

      createSchedule: function(param, cb) {
        $http.post(options.API_URL + '/schedules', param)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          }); 
      },

      getSchedules: function(cb) {
        $http.get(options.API_URL + '/schedules')
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          });
      },

      getPatientSchedules: function(param, cb) {
        $http.get(options.API_URL + '/patient/schedules/' + param)
          .success(function(doc) {
            cb(doc);
          })
          .error(function(err) {
            cb(err);
          })
      }
    };

  }]);