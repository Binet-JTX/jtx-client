'use strict';

angular.module('jtx.admin.tag', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.admin.tag', {
                url: '/tag',
                abstract: true,
                template: '<ui-view />',
            })
            .state('index.admin.tag.edit', {
                url: '/edit',
                templateUrl: 'app/components/admin/tag/edit.html',
                controller: 'admin.tag.edit.ctrl',
            });
    }
])

.controller('admin.tag.edit.ctrl', ['$scope', '$resource', 'Tag',
    function($scope, $resource, Tag) {
        //$scope.tags = Tag.query();
        $scope.tags = [{
            id: 1,
            key: "Objet",
            value: "HCQ"
        }];

        $scope.showSuccess = false;
        $scope.showErrors = false;

        $scope.editTag = function(selectedTag) {
            Tag.update(selectedTag).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "Le tag n°" + selectedTag.id + " a été ajouté avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = errors;
            });
        };
    }
]);
