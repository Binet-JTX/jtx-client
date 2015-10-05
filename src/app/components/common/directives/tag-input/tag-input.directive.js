(function() {
    'use strict';

    angular
        .module('jtx')
        .directive('jtxTagInput', jtxTagInput);

    /** @ngInject */
    function jtxTagInput() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/common/directives/tag-input/tag-input.html',
            scope: {
                tags: '=ngModel'
            },
            controller: 'jtxTagInputController',
            controllerAs: 'jtiCtl'
        };
    }

    /** @ngInput */
    function jtxTagInputController($resource, Tag) {
        var vm = this;

        vm.tags = [];

        vm.loadTags = function() {
            return Tag.query();
        };

        vm.addTag = function() {
            if (vm.tagToBeAdded && vm.tagToBeAdded._type && vm.tagToBeAdded.value) {
                vm.tags.push(vm.tagToBeAdded);
                vm.tagToBeAdded = null;
            }
        };
    }

})();