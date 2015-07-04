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
  $scope.event.beginDate = { date :new Date('2015-03-21'), time:new Date('2015-03-21T08:00:00+0100')};
  $scope.event.endDate = {date:new Date('2015-03-22'), time: new Date('2015-03-22T15:00:00+0100')};

  $scope.addEvent = function (event) {
    var save = { beginDate : {date : event.beginDate.date, time : event.beginDate.time},
     endDate : {date : event.endDate.date, time : event.endDate.time}};
    event.beginDate = event.beginDate.date + "T"+ event.beginDate.time;
    event.endDate = event.endDate.date + "T"+ event.endDate.time;
    console.log(event);
    event.$save().then(function(result) {
      $scope.success =  "L'événement a été ajouté avec succès !";
    },
    function(errors) {
      $scope.errors = errors;
      console.log(errors)}
  );
  event.beginDate = {date : save.beginDate.date, time : save.beginDate.time };
  event.endDate = {date : save.endDate.date, time : save.endDate.time };

};
}
]);
