/*
 * Tempstore service
 * @description Temporarily store a selected schedule information for RUD operations
 * @definition RUD: 'Read', 'Update', 'Delete'
 */

angular.module('tempStoreModule', [])
  .factory('tempStore', [function () {
    return {
      currentAppointment: {}
    };
  }])