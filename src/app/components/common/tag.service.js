(function() {
    'use strict';

    angular
        .module('jtx')
        .factory('Tag', Tag);

    /** @ngInject */
    function Tag(API, $resource) {
        return $resource(
            API.route('tags/:id'), 
            {id: '@id'}, 
            {
                update: {method: 'PUT', url: API.route('tags/:id')}
            }, 
            {stripTrailingSlashes: false}
        );
    }
    
})();
