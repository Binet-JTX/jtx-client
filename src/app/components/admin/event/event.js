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
['$scope', '$resource', 'Event' , function($scope,$resource,Event) {
  $scope.event = new Event();
  $scope.event.title = "TSGED 2015";
  $scope.event.description = "Tournoi Sportif des Grandes Écoles de la Défense";
  $scope.event_beginDate = new Date('2015','3','21','8','0','0');
  $scope.event_endDate = new Date('2015','3','22','15','0','0');

  $scope.addEvent = function (event) {
    event.beginDate = $scope.event_beginDate.toISOString();
    event.endDate = $scope.event_endDate.toISOString();
    Event.save({"event": $scope.event}).then(function(result) {
      $scope.success =  "L'événement a été ajouté avec succès !";
    },
    function(errors) {
      $scope.errors = errors;
  });

};
}
]);
