(function() {
    'use strict';

    angular
        .module('jtx.video')
        .factory('Video', Video);

    /** @ngInject */
    function Video(API, $resource) {
        return $resource(
            API.route('videos/:id'), 
            {id: '@id'}, 
            {
                update: {method: 'PUT', url: API.route('videos/:id')}
            }, 
            {stripTrailingSlashes: false}
        );
    }

})();
