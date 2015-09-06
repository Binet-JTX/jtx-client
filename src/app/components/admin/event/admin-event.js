angular.module('jtx.admin.event', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.admin.event', {
                url: '/event',
                abstract: true,
                template: '<ui-view />',
            })
            .state('index.admin.event.add', {
                url: '/add',
                templateUrl: 'app/components/admin/event/add.html',
                controller: 'admin.event.add.ctrl',
            })
            .state('index.admin.event.edit', {
                url: '/edit/{eventId:[0-9]+}',
                templateUrl: 'app/components/admin/event/edit.html',
                controller: 'admin.event.edit.ctrl',
            });
    }
])

.controller('admin.event.add.ctrl', ['$scope', '$resource', 'Event',
    function($scope, $resource, Event) {
        $scope.event = new Event();
        $scope.now = new moment();
        $scope.showSuccess = false;
        $scope.showErrors = false;

        //Functions for datepicker
        $scope.openBegin = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedBegin = true;
        };
        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = true;
        };

        $scope.addEvent = function(event) {
            var sentEvent = {
                title: event.title,
                description: event.description
            };

            //Merge the date and time fields into one datetime JSON string
            sentEvent.begin_date = moment(event.beginDate_f);
            sentEvent.begin_date = sentEvent.begin_date.format("YYYY-MM-DD");

            sentEvent.end_date = moment(event.endDate_f);
            sentEvent.end_date = sentEvent.end_date.format("YYYY-MM-DD");

            Event.save(sentEvent).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "L'événement " + Event.title + " a été ajouté avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = errors;
            });
        };
    }
])

.controller('admin.event.edit.ctrl', ['$scope', '$resource', 'Event', '$stateParams', '$window', '$state',
    function($scope, $resource, Event, $stateParams, $window, $state) {
        Event.get({
            id: $stateParams.eventId
        }, function(event) {
            $scope.event = event;

            //Hydrates the date and time fields of the form with the data
            var beginDate_f = moment(event.begin_date);
            $scope.event.beginDate_f = beginDate_f.toDate();

            var endDate_f = moment(event.end_date);
            $scope.event.endDate_f = endDate_f.toDate();
        });

        //Functions for datepicker
        $scope.openBegin = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedBegin = true;
        };
        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = true;
        };

        $scope.now = new Date();
        $scope.showSuccess = false;
        $scope.showErrors = false;

        $scope.editEvent = function(event) {
            var sentEvent = {
                title: event.title,
                description: event.description,
                id: event.id
            };

            //Merge the date and time fields into one datetime JSON string
            sentEvent.begin_date = moment(event.beginDate_f);
            sentEvent.begin_date = sentEvent.begin_date.format("YYYY-MM-DD");

            sentEvent.end_date = moment(event.endDate_f);
            sentEvent.end_date = sentEvent.end_date.format("YYYY-MM-DD");

            Event.update(sentEvent).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "L'événement a été mis à jour avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = "Une erreur est survenue lors de la modification de l'événement.";
                console.log(errors);
            });
        };

        $scope.deleteEvent = function(eventToDelete) {
            if ($window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
                Event.delete(eventToDelete.id).$promise.then(
                    function() {
                        $scope.event = null;
                        $scope.showSuccess = true;
                        $scope.success = "L'événement a supprimé avec succès !";
                    },
                    function(errors) {
                        $scope.showErrors = true;
                        $scope.errors = errors;
                    }
                );
            }
        };
    }
]);
