'use strict';

angular.module('jtx', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap',

    'jtx.main',
    'jtx.video',
    'jtx.search',
])

.config(['$urlRouterProvider',
    function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
])
;
