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
  $scope.event.beginDate = new Date('2015','3','21','8','0','0');
  $scope.event.endDate = new Date('2015','3','22','15','0','0');

  $scope.addEvent = function (event) {
    event.$save().then(function(result) {
      $scope.success =  "L'événement a été ajouté avec succès !";
    },
    function(errors) {
      $scope.errors = errors;
      console.log(errors)}
  );

};
}
]);
