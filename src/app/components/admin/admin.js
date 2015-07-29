angular.module('jtx.admin', [
    'jtx.admin.event',
    'jtx.admin.tag',
    'jtx.admin.video'
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.admin', {
                url: 'admin',
                templateUrl: 'app/components/admin/admin.html',
                controller: 'admin.ctrl'
            })
        ;
    }
])

.controller('admin.ctrl',
    ['$scope',
    function($scope) {
      $scope.showAdminPanel = true;
    }
])
;
