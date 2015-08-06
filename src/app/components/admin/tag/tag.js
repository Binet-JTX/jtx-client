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

.controller('admin.tag.edit.ctrl', ['$scope', '$resource', 'Tag', 'tag.converter',
    function($scope, $resource, Tag, converter) {
        $scope.tags = Tag.query();

        $scope.showSuccess = false;
        $scope.showErrors = false;

        $scope.editTag = function(selectedTag) {
            selectedTag.key = converter.keyFromType(selectedTag._type);
            console.log(selectedTag);
            Tag.update(selectedTag).$promise.then(function(result) {
                $scope.showSuccess = true;
                $scope.success = "Le tag n°" + selectedTag.id + " a été ajouté avec succès !";
            }, function(errors) {
                $scope.showErrors = true;
                $scope.errors = "Une erreur est survenue lors de la modification du tag.";
                console.log(errors);
            });
        };
    }
])

//Tags received from the API contain _type which are strings
//To POST a new tag the API requires the id key associated with the _type
//This function does the conversion
.factory('tag.converter', function() {
    return {
        keyFromType: function(type) {
            switch (type) {
                case "JTX":
                    return {
                        value: 1,
                        display_name: "JTX"
                    };
                    break;
                case "Acteur":
                    return {
                        value: 2,
                        display_name: "Acteur"
                    };
                    break;
                case "Réalisateur":
                    return {
                        value: 3,
                        display_name: "Réalisateur"
                    };
                    break;
                case "Binet":
                    return {
                        value: 4,
                        display_name: "Binet"
                    };
                    break;
                case "Catégorie":
                    return {
                        value: 5,
                        display_name: "Catégorie"
                    };
                    break;
                case "Lieu":
                    return {
                        value: 6,
                        display_name: "Lieu"
                    };
                    break;
                case "Objet":
                    return {
                        value: 7,
                        display_name: "Objet"
                    };
                    break;
                case "Autre":
                    return {
                        value: 8,
                        display_name: "Autre"
                    };
                    break;
            }
        }
    }
});
