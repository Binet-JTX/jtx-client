(function() {
    'use strict';

    angular
        .module('jtx')
        .directive('jtxThumbnail', jtxThumbnail);

    /** @ngInject */
    function jtxThumbnail() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/common/directives/thumbnail/thumbnail.html',
            scope: {
                kind: '=', // video | projection | event
                object: '='
            },
            controller: function() {
                var vm = this;

                vm.kind = (angular.isUndefined(vm.kind)) ? 'video' : vm.kind;
                if (vm.kind == "event") {
                    vm.object.date = vm.object.begin_date;
                }
            }
        };
    }

})();