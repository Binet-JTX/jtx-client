(function() {
    'use strict';

    angular
        .module('jtx.contents')
        .controller('ContentsAllController', ContentsAllController)
        .controller('ContentsProjsController', ContentsProjsController)
        .controller('ContentsViewController', ContentsViewController);

    /** @ngInject */
    function ContentsAllController(contents_list) {
        var vm = this;

        vm.contents_list = _.sortBy(contents_list, 'begin_date').reverse();
    }

    /** @ngInject */
    function ContentsProjsController(projections_list) {
        var vm = this;

        vm.projections = _.sortBy(projections_list, 'begin_date').reverse();
    }

    /** @ngInject */
    function ContentsViewController($stateParams, Event, Projection) {
        var vm = this;

        var projs = [];
        Event.get({id: $stateParams.id}).$promise.then(function(e) {
            vm.event = e;
            _.forEach(vm.event.projections, function(pid) {
                Projection.get({id: pid}).$promise.then(function(p) {
                    projs.push(p);
                });
            });

            vm.event.projections = projs;
        });
    }

})();