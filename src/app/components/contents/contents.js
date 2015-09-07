'use strict';

angular.module('jtx.contents', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.contents', {
                url: 'contents/',
                abstract: true,
                template: "<ui-view />",
            })
                .state('index.contents.all', {
                    url: 'all',
                    templateUrl: 'app/components/contents/all.html',
                    controller: 'contents.ctrl.all',
                    resolve: {
                        contents_list: ['Event', function(Event) {
                            return Event.query();
                        }]
                    }
                })
                .state('index.contents.projs', {
                    url: 'projs',
                    templateUrl: 'app/components/contents/projs.html',
                    controller: 'contents.ctrl.projs',
                    resolve: {
                        projections_list: ['Event', function(Event) {
                            return Event.query();
                        }]
                    }
                })
                .state('index.contents.view', {
                    url: 'view/:id',
                    templateUrl: 'app/components/contents/view.html',
                    controller: 'contents.ctrl.view'
                })
        ;
    }
])

.controller('contents.ctrl.all', 
    ['$scope', 'contents_list',
    function($scope, contents_list) {
        $scope.contents_list = _.sortBy(contents_list, 'begin_date').reverse();
    }
])

.controller('contents.ctrl.projs', 
    ['$scope', 'projections_list',
    function($scope, projections_list) {
        $scope.projections = _.sortBy(projections_list, 'begin_date').reverse();
    }
])

.controller('contents.ctrl.view', 
    ['$scope', '$stateParams', 'Event', 'Projection', 
    function($scope, $stateParams, Event, Projection) {
        var projs = [];
        Event.get({id: $stateParams.id}).$promise.then(function(e) {
            $scope.event = e;
            _.forEach($scope.event.projections, function(pid) {
                Projection.get({id: pid}).$promise.then(function(p) {
                    projs.push(p);
                });
            });
            $scope.event.projections = projs;
        });
    }
])
;
