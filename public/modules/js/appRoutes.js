'use strict';

angular.module('appRouter', ['ui.router'])
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
      });


  }]);