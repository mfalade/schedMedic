/**
 * App controller
 *
 * Main app module into which all other modules in the app are injected
 *
 */


angular.module('App', ['appRouter', 
  'authModule', 
  'mainModule', 
  'patientModule', 
  'doctorModule', 
  'authtokenModule', 
  'adminModule', 
  'scheduleModule',
  'userHomeModule',
  'editModule',
  'formValidationModule'
]);