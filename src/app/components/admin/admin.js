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
            .state('index.admin.event', {
              url: '/events',
              templateUrl : 'app/components/admin/event/event.html',
              controller: 'admin.event.ctrl',
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
