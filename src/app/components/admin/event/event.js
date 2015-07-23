angular.module('jtx.admin.event', [
  //
])

.config(['$stateProvider',
function($stateProvider) {
  $stateProvider
  .state('index.admin.event', {
    url: '/event',
    abstract : true,
    template : '<ui-view />',
  })
  .state('index.admin.event.add', {
    url: '/add',
    templateUrl : 'app/components/admin/event/add.html',
    controller: 'admin.event.add.ctrl',
  })
  ;
}
])

.controller('admin.event.add.ctrl',
['$scope', '$resource', 'Event',
function($scope,$resource,Event) {
  $scope.activePanel = "addTag";
  $scope.event = new Event();

  $scope.openBegin = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.datepickerBegin = true;
  };

  $scope.openEnd = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.datepickerEnd = true;
  };

  $scope.addEvent = function (event) {
    $scope.event.beginDate_f = new Date();
    $scope.event.endDate_f = new Date();
    event.beginDate = $scope.event.beginDate_f.toJSON();
    event.endDate = $scope.event.endDate_f.toJSON();
    Event.save($scope.event).$promise.then(function(result) {
      $scope.success =  "L'événement a été ajouté avec succès !";
    }, function(errors) {
      $scope.errors = errors;
    });
  };
}]
);
