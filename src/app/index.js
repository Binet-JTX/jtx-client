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
])

.config(['$urlRouterProvider',
    function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }
])
;
