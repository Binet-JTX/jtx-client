angular.module('jtx.admin.event', [
    //
])
.controller('admin.event.ctrl',
  ['$scope', '$resource', 'Event' , function($scope,$resource,Event) {
    $scope.eventAdded = {
      title : "TSGED 2015",
      description : "Tournoi Sportif des Grandes Écoles de la Défense",
      beginDate : '2015-03-21T08:00:00+0100',
      endDate : '2015-03-22T15:00:00+0100',
    };


    $scope.addEvent = function () {
      Event.save($scope.eventAdded);
      $scope.add = { success : "L'événement a été ajouté avec succès !" };
    }
  }
]);
