angular.module('jtx.admin.tag', [
  //
])

.config(['$stateProvider',
function($stateProvider) {
  $stateProvider
  .state('index.admin.tag', {
    url: '/tag',
    abstract : true,
    template : '<ui-view />',
  })
  .state('index.admin.tag.list', {
    url: '/list',
    templateUrl : 'app/components/admin/tag/list.html',
    controller: 'admin.tag.list.ctrl',
  })
  ;
}
])

.controller('admin.tag.list.ctrl',
['$scope', '$resource', 'Tag' , function($scope,$resource,Tag) {
  $scope.tags = Tag.query();
  console.log($scope.tags);

}]);
