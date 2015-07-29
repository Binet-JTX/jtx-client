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
    ['$scope', '$resource', 'Event',
    function($scope, $resource, Event) {
      $scope.events = Event.query();
      console.log($scope.events);
    }
]);
