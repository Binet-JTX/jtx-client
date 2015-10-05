(function() {
    'use strict';

    angular
        .module('jtx')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
            .state('index', {
                abstract: true,
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/main/layout.html',
                        controller: 'MainController',
                        controllerAs: 'mainCtl'
                    },
                    'navbar@index': {
                        templateUrl: 'app/main/navbar.html',
                        controller: 'NavbarController',
                        controllerAs: 'navbarCtl'
                    }
                }
            })
                .state('index.home', {
                    url: 'home',
                    templateUrl: 'app/components/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'homeCtl'
                })
        ;
    }

})();
