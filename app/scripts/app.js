'use strict';

/**
 * @ngdoc overview
 * @name jtxClientApp
 * @description
 * # jtxClientApp
 *
 * Main module of the application.
 */
angular
  .module('jtxClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/binet', {
        templateUrl: 'views/binet.html',
        controller: 'BinetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
