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
  $scope.event = new Event();
  $scope.now = new Date();
  $scope.showSuccess = false;
  $scope.showErrors = false;

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
    var sentEvent = {title : event.title, description : event.description};

    var beginHours = $scope.event.beginTime_f.split(":")[0];
    var beginMinutes = $scope.event.beginTime_f.split(":")[1];
    event.beginDate_f.setHours(beginHours);
    event.beginDate_f.setMinutes(beginMinutes);
    sentEvent.beginDate = $scope.event.beginDate_f.toJSON();

    var endHours = $scope.event.endTime_f.split(":")[0];
    var endMinutes = $scope.event.endTime_f.split(":")[1];
    event.endDate_f.setHours(endHours);
    event.endDate_f.setMinutes(endMinutes);
    sentEvent.endDate = $scope.event.endDate_f.toJSON();

    console.log(sentEvent);
    Event.save(sentEvent).$promise.then(function(result) {
      $scope.showSuccess = true;
      $scope.success =  "L'événement a été ajouté avec succès !";
    }, function(errors) {
      $scope.showErrors= true;
      $scope.errors = errors;
    });
  };
}]
);
