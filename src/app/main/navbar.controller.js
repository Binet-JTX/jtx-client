(function() {
    'use strict';

    angular
        .module('jtx')
        .controller('NavbarController', NavbarController);

    /** @ngInject */
    function NavbarController($log) {
        var vm = this;

        vm.search = function(q) {
            $log.debug(q);
        }
    }
})();
