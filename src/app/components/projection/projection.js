'use strict';

angular.module('jtx.projection', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.projection', {
                url: 'projection/{projId:[0-9]+}',
                templateUrl: 'app/components/projection/projection.html',
                controller: 'projection.ctrl'
            });
    }
])

.controller('projection.ctrl', ['$scope', '$resource', 'Projection', 'Video', '$stateParams', '$state',
    function($scope, $resource, Projection, Video, $stateParams, $state) {
        if(!$stateParams.projId) {
            $stateParams.projId = 0;
        }

        Projection.query({id: $stateParams.projId}).$promise.then(
            function(projection) {
                $scope.proj = projection;
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
