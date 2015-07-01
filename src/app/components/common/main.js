'use strict';

angular.module('jtx.main', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/components/common/layout.html',
                        controller: 'main.ctrl.base'
                    },
                    'navbar@index': {
                        templateUrl: 'app/components/common/navbar.html',
                        controller: 'main.ctrl.navbar'
                    },
                    '@index': {
                        templateUrl: 'app/components/common/home.html',
                        controller: 'main.ctrl.home'
                    }
                }
            })
            .state('index.binet', {
                url: 'binet',
                templateUrl: 'app/components/static/binet.html'
            })
        ;
    }
])

.controller('main.ctrl.base',
    ['$scope',
    function($scope) {
        $scope.hello = 'Hello';
    }
])

.controller('main.ctrl.navbar',
    ['$scope',
    function($scope) {
        $scope.search = '';

        $scope.pages = [
            {name:'Accueil', sref:'index', icon:'home'},
            {name:'Le binet', sref:'index.binet', icon:'heart'},
            {name:'Video', sref:'index.video', icon:'film'},
            {name:'Recherche', sref:'index.search', icon:'search'}
        ];
    }
])

.controller('main.ctrl.home',
    ['$scope',
    function($scope) {
        //
    }
])
;
