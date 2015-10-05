(function() {
    'use strict';

    angular
        .module('jtx')
        .controller('HomeController', HomeController);

    /** @ngInject */
    function HomeController(Event, moment) {
        var vm = this;

        Event.findAll().then(
            function(events) {
                _.forEach(events, function(p) {
                    p.begin_date = moment(p.begin_date);
                });

                vm.recent_events = _.sortBy(events, 'begin_date').reverse();
                vm.last_event = vm.recent_events.shift();
            }
        );
    }

})();