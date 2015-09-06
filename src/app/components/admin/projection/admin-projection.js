angular.module('jtx.admin.projection', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.admin.projection', {
                url: '/projection',
                abstract: true,
                template: '<ui-view />',
            })
            .state('index.admin.projection.add', {
                url: '/add',
                templateUrl: 'app/components/admin/projection/add.html',
                controller: 'admin.projection.add.ctrl',
            })
            .state('index.admin.projection.edit', {
                url: '/edit/{projectionId:[0-9]+}',
                templateUrl: 'app/components/admin/projection/edit.html',
                controller: 'admin.projection.edit.ctrl',
            });
    }
])

.controller('admin.projection.add.ctrl', ['$scope', '$resource', 'Event', 'Projection',
    function($scope, $resource, Event, Projection) {
        $scope.now = moment();
        $scope.standalone = true;

        //Functions for datepicker
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        //For event autocompletion
        Event.query().$promise.then(
            function(events) {
                $scope.events = events;
                console.log($scope.events);
            }
        )

        $scope.addProjection = function(projection) {
            var sentProjection = {
                title: projection.title,
                description: projection.description,
                date: moment(projection.date_f).format('YYYY-MM-DD'),
                event : projection.event.id
            };

            Projection.save(sentProjection).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "L'événement " + projection.title + " a été ajouté avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = errors;
            });
        };
    }
])

.controller('admin.projection.edit.ctrl', ['$scope', '$resource', 'Projection', 'Event', '$stateParams', '$window', '$state',
    function($scope, $resource, Projection, Event, $stateParams, $window, $state) {
        Projection.get({
            id: $stateParams.projectionId
        }, function(projection) {
            $scope.projection = projection;

            var date_f = moment(projection.date);
            $scope.projection.date_f = date_f.toDate();
            Event.get({
                id: projection.event
            }, function(event) {
                $scope.projection.event = event;
            })
        });

        //For event autocompletion
        Event.query().$promise.then(
            function(events) {
                $scope.events = events;
            }
        )

        //Functions for datepicker
        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        //Initialization of the form
        $scope.now = moment();
        $scope.showSuccess = false;
        $scope.showErrors = false;

        $scope.editProjection = function(projection) {
            var sentProjection = {
                title: projection.title,
                description: projection.description,
                id: projection.id,
                date: moment(projection.date_f).format('YYYY-MM-DD'),
                event: projection.event.id
            };
            Projection.update(sentProjection).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "L'événement a été mis à jour avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = "Une erreur est survenue lors de la modification de l'événement.";
                console.log(errors);
            });
        };
    }
]);
