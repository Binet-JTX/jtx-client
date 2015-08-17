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

.controller('admin.projection.add.ctrl', ['$scope', '$resource', 'Projection',
    function($scope, $resource, Projection) {
        $scope.now = moment();

        $scope.addProjection = function(projection) {
            var sentProjection = {
                title: projection.title,
                description: projection.description,
                date:moment(projection.date_f).format('YYYY-MM-DD'),
                poster:null
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

.controller('admin.projection.edit.ctrl', ['$scope', '$resource', 'Projection', '$stateParams', '$window', '$state',
    function($scope, $resource, Projection, $stateParams, $window, $state) {
        Projection.get({
            id: $stateParams.projectionId
        }, function(projection) {
            $scope.projection = projection;

            var date_f = moment(projection.date);
            $scope.projection.date_f = date_f.toDate();

            $scope.projection.updated_at = moment(projection.updated_at);
        });

        $scope.now = moment();
        $scope.showSuccess = false;
        $scope.showErrors = false;

        $scope.editProjection = function(projection) {
            var sentProjection = {
                title: projection.title,
                description: projection.description,
                id: projection.id,
                date: moment(projection.date_f).format('YYYY-MM-DD')
            };

            console.log(sentProjection);

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
