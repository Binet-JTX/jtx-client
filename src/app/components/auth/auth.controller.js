(function() {
    'use strict';

    angular
        .module('jtx.auth')
        .controller('AuthController', AuthController);

    /** @ngInject */
    function AuthController($resource, $state, AuthService, $log) {
        var vm = this;

        vm.alerts = [];
        
        vm.customLogin = function(credentials) {
            AuthService.login(credentials).then(
                function() {
                    $state.go('index.home');
                },
                function(errors) {
                    vm.credentials.password = "";
                    vm.alerts.push("Une erreur a eu lieu. Veuillez réessayer. Si le problème persiste, contacter le respo web.");
                    $log.error(errors);
                }
            );
        };
    }
})();
