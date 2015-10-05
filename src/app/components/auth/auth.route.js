(function() {
    'use strict';

    angular
        .module('jtx.auth')
        .config(AuthRouter);

    /** @ngInject */
    function AuthRouter($stateProvider) {
        $stateProvider
            .state('index.login', {
                url: 'login',
                templateUrl: 'app/components/auth/login.html',
                controller: 'AuthController',
                controllerAs: 'authCtl'
            })
        ;
    }
})();
