angular.module('jtx.search', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.search', {
                url: 'search',
                templateUrl: 'app/components/search/search-results.html',
                controller: 'searchResults.ctrl'
            })
        ;
    }
])

.controller('searchResults.ctrl',
    ['$scope', '$resource',
    function($scope, $resource) {
      $scope.query="Les démons des Sylvie";
      $scope.events=$resource("http://binet-jtx.com/dev/jtx-server/web/events.json");
      console.log($scope.events.get());
    }
]);
