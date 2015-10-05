(function() {
    'use strict';

    angular
        .module('jtx', [
            'ngAnimate', 
            'ngCookies', 
            'ngTouch', 
            'ngSanitize', 
            'ngMessages', 
            'ngAria', 
            'ngResource', 
            'ui.router', 
            'ui.bootstrap',
            'ngTagsInput',

            'jtx.auth',
            'jtx.static',
            'jtx.contents',
            'jtx.video',
            'jtx.admin'
        ]);

})();
