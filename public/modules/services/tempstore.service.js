angular.module('tempStoreModule', [])
  .factory('tempStore', [function () {
    return {
      currentAppointment: {}
    };
  }])