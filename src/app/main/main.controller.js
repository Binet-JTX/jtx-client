(function() {
    'use strict';

    angular
        .module('jtx')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($state, AuthService) {
        var vm = this;

        vm.logout = function() {
            AuthService.logout();
            $state.go('index.login');
        };

        vm.isLoggedIn = function() {
            return AuthService.isAuthenticated();
        };
    }
})();
