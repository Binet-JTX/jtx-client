(function() {
    'use strict';

    angular
        .module('jtx.contents')
        .factory('Event', Event)
        .factory('Projection', Projection);

    /** @ngInject */
    function Event(API, $resource) {
        return $resource(
            API.route('events/:id'), 
            {id: '@id'}, 
            {
                update: {method: 'PUT', url: API.route('events/:id')}
            }, 
            {stripTrailingSlashes: false}
        );
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
