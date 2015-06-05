'use strict';

angular.module('appRouter', ['ui.router', 'ngCookies'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'modules/views/core/home.html',
        controller: 'mainCtrl'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'modules/views/auth/signup.html',
        controller: 'authCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'modules/views/auth/login.html',
        controller: 'authCtrl'
      })

      .state('patient', {
        url: '/patient/home',
        templateUrl: 'modules/views/core/patient.client.view.html',
        controller: 'patientCtrl'
      })

      .state('doctor', {
        url: '/doctor/home',
        templateUrl: 'modules/views/core/doctor.client.view.html',
        controller: 'doctorCtrl'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'modules/views/core/admin.client.view.html',
        controller: 'adminCtrl'
      })

      .state('bookAppointment', {
        url: '/book-appointment',
        templateurl: 'modules/views/core/book.appointment.view.html'
      });
  }])
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
  })
  .value('options', {
    'API_URL' : 'http://localhost:5555/api/v1/'
  });