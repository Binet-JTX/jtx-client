(function() {
    'use strict';

    angular
        .module('jtx.static', [])
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('index.binet', {
                url: 'binet',
                templateUrl: 'app/components/static/binet.html'
            })
            .state('index.legal', {
                url: 'legal',
                templateUrl: 'app/components/static/legal.html'
            })
        ;
    }

})();