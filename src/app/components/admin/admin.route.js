(function() {
    'use strict';

    angular
        .module('jtx.admin')
        .config(AdminRouter);

    /** @ngInject */
    function AdminRouter($stateProvider) {
        $stateProvider
            .state('index.admin', {
                url: 'admin',
                templateUrl: 'app/components/admin/admin-layout.html',
                controller: 'AdminController',
                controllerAd: 'adminCtrl'
            })
        ;
    }
})();
