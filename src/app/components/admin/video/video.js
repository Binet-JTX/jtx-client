angular.module('jtx.admin.video', [
  //
])

.config(['$stateProvider',
function($stateProvider) {
  $stateProvider
  .state('index.admin.video', {
    url: '/video',
    abstract : true,
    template : '<ui-view />',
  })
  .state('index.admin.video.add', {
    url: '/add',
    templateUrl : 'app/components/admin/video/add.html',
    controller: 'admin.video.add.ctrl',
  })
  ;
}
])

.controller('admin.video.add.ctrl',
['$scope', '$resource', 'Video', function($scope,$resource,Video) {
  //
}]);
