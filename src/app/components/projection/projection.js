'use strict';

angular.module('jtx.projection', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.projection', {
                url: 'projection',
                templateUrl: 'app/components/projection/projection.html',
                controller: 'projection.ctrl'
            });
    }
])

.controller('projection.ctrl', ['$scope', '$resource', 'Projection', 'Video',
    function($scope, $resource, Projection, Video) {
        Projection.query().$promise.then(
            function(projections) {
                $scope.proj = projections[2];
                $scope.proj.date = moment($scope.proj.date);
            }
        );

        Video.query().$promise.then(
            function(videos) {
                $scope.videos=videos;
            }
        )
    }
]);
