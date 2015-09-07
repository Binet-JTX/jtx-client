'use strict';

angular.module('jtx', [
    'ngAnimate',
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'ngTagsInput',

    'jtx.main',
    'jtx.video',
    'jtx.search',
    'jtx.api',
    'jtx.admin',
    'jtx.auth',
    'jtx.contents'
])

.config(['$urlRouterProvider',
    function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }
])

//Enable the interception of queries by the auth.interceptor factory (auth.js)
.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('auth.interceptor');
    }
]);
