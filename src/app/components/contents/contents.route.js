(function() {
    'use strict';

    angular
        .module('jtx.contents')
        .config(ContentsRouter);

    /** @ngInject */
    function ContentsRouter($stateProvider) {
        $stateProvider
            .state('index.contents', {
                url: 'contents/',
                abstract: true,
                template: "<ui-view />"
            })
                .state('index.contents.all', {
                    url: 'all',
                    templateUrl: 'app/components/contents/all.html',
                    controller: 'ContentsAllController',
                    controllerAs: 'allCtl',
                    resolve: {
                        contents_list: ['Event', function(Event) {
                            return Event.query();
                        }]
                    }
                })
                .state('index.contents.projs', {
                    url: 'projs',
                    templateUrl: 'app/components/contents/projs.html',
                    controller: 'ContentsProjsController',
                    controllerAs: 'projsCtl',
                    resolve: {
                        projections_list: ['Event', function(Event) {
                            return Event.query();
                        }]
                    }
                })
                .state('index.contents.view', {
                    url: 'view/:id',
                    templateUrl: 'app/components/contents/view.html',
                    controller: 'ContentsViewController',
                    controllerAs: 'viewCtl'
                })
        ;
    }
})();
