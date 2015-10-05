(function() {
    'use strict';

    angular
        .module('jtx.contents')
        .factory('Event', Event)
        .factory('Projection', Projection);

    /** @ngInject */
    function Event(API, $resource, DS) {
        // return $resource(
        //     API.route('events/:id'), 
        //     {id: '@id'}, 
        //     {
        //         update: {method: 'PUT', url: API.route('events/:id')}
        //     }, 
        //     {stripTrailingSlashes: false}
        // );
        return DS.defineResource('events');
    }

    /** @ngInject */
    function Projection(API, $resource) {
        return $resource(
            API.route('projections/:id'), 
            {id: '@id'},
            {
                update: {method: 'PUT', url: API.route('projections/:id')}
            }, 
            {stripTrailingSlashes: false}
        );
    }
})();
