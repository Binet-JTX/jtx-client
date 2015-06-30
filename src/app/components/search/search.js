angular.module('jtx.video', [
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

.controller('video.ctrl',
    ['$scope',
    function($scope) {;
      $scope.query="Les démons des Sylvie"
    }
])
