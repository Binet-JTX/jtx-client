(function() {
    'use strict';

    angular
        .module('jtx.admin.tag')
        .config(AdminTagRouter);

    /** @ngInject */
    function AdminTagRouter($stateProvider) {
        $stateProvider
            .state('index.admin.tag', {
                url: '/tag',
                abstract: true,
                template: '<ui-view />',
            })
                .state('index.admin.tag.edit', {
                    url: '/edit',
                    templateUrl: 'app/components/admin/tag/edit.html',
                    controller: 'AdminTagEditController',
                    controllerAs: 'tagEditCtl'
                })
        ;
    }
})();
