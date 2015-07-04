angular.module('jtx.admin', [
    'jtx.admin.event'
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
      //
    }
])
;
