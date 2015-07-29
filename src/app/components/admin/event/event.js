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
  .state('index.admin.event.edit', {
    url: '/edit/{eventId:[0-9]+}',
    templateUrl : 'app/components/admin/event/edit.html',
    controller: 'admin.event.edit.ctrl',
  })
  ;
}
])

.controller('admin.event.add.ctrl',
['$scope', '$resource', 'Event',
function($scope,$resource,Event) {
  $scope.event = new Event();
  $scope.now = new moment();
  $scope.showSuccess = false;
  $scope.showErrors = false;

  $scope.addEvent = function (event) {
    var sentEvent = {title : event.title, description : event.description};
    console.log(event);

    //Merge the date and time fields into one datetime JSON string
    var beginHours = event.beginTime_f.split(":")[0];
    var beginMinutes = event.beginTime_f.split(":")[1];
    sentEvent.begin_date = moment(event.beginDate_f);
    sentEvent.begin_date.hours(beginHours);
    sentEvent.begin_date.minutes(beginMinutes);
    sentEvent.begin_date = sentEvent.begin_date.toJSON();

    var endHours = event.endTime_f.split(":")[0];
    var endMinutes = event.endTime_f.split(":")[1];
    sentEvent.end_date = moment(event.endDate_f);
    sentEvent.end_date.hours(endHours);
    sentEvent.end_date.minutes(endMinutes);
    sentEvent.end_date = sentEvent.end_date.toJSON();

    Event.save(sentEvent).$promise.then(function(result) {
      $scope.showSuccess = true;
      $scope.success =  "L'événement "+ Event.title+" a été ajouté avec succès !";
    }, function(errors) {
      $scope.showErrors= true;
      $scope.errors = errors;
    });
  };
}]
)

.controller('admin.event.edit.ctrl',
['$scope', '$resource', 'Event', '$stateParams', '$window', '$state',
function($scope,$resource,Event, $stateParams, $window, $state) {
  Event.get({id:$stateParams.eventId}, function(event) {
    $scope.event = event;
    console.log('event');
    //Hydrates the date and time fields of the form with the data
    var beginDate_f = moment(event.begin_date);
    $scope.event.beginDate_f = beginDate_f.toDate();
    $scope.event.beginTime_f = beginDate_f.add(2,'h').format('HH:mm');//TODO delete add(2,'h')

    var endDate_f= moment(event.end_date);
    $scope.event.endDate_f = endDate_f.toDate();
    $scope.event.endTime_f = endDate_f.add(2,'h').format('HH:mm');

    $scope.event.updated_at = moment(event.updated_at);
  });

  $scope.now = new Date();
  $scope.showSuccess = false;
  $scope.showErrors = false;

  $scope.editEvent = function(event) {
    var sentEvent = {title : event.title, description : event.description, id: event.id};

    //Merge the date and time fields into one datetime JSON string
    var beginHours = event.beginTime_f.split(":")[0];
    var beginMinutes = event.beginTime_f.split(":")[1];
    sentEvent.begin_date = moment(event.beginDate_f);
    sentEvent.begin_date.hours(beginHours);
    sentEvent.begin_date.minutes(beginMinutes);
    sentEvent.begin_date = sentEvent.begin_date.toJSON();

    var endHours = event.endTime_f.split(":")[0];
    var endMinutes = event.endTime_f.split(":")[1];
    sentEvent.end_date = moment(event.endDate_f);
    sentEvent.end_date.hours(endHours);
    sentEvent.end_date.minutes(endMinutes);
    sentEvent.end_date = sentEvent.end_date.toJSON();

    Event.update(sentEvent).$promise.then(function(result) {
      $scope.showSuccess = true;
      $scope.success =  "L'événement a été mis à jour avec succès !";
    }, function(errors) {
      $scope.showErrors= true;
      $scope.errors = errors;
    });
  };

  $scope.deleteEvent = function(eventToDelete) {
    if ($window.confirm("Voulez-vous vraiment supprimer cet événement ?"))
      {
        Event.delete(eventToDelete.id).$promise.then(
          function() {
            $scope.event = null;
            $scope.showSuccess = true;
            $scope.success =  "L'événement a supprimé avec succès !";
          },
          function(errors) {
            $scope.showErrors= true;
            $scope.errors = errors;
          }
        )
      }
  };
}]
);
