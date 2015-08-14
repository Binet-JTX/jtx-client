'use strict';

angular.module('jtx.api', [
    'ngResource'
])

.factory('API', ['$location',
    function($location) {
        return {
            route: function(path) {
                if (/localhost/.test($location.absUrl())) {
                    return 'http://127.0.0.1:8000' + (path === '' ? '' : '/' + path);
                } else {
                    return 'http://binet-jtx.com/api' + (path === '' ? '' : '/' + path);
                }
            }
        };
    }
])

.factory('Event', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('events/:id/'), {id: '@id'}, {
            update: {method: 'PUT', url: API.route('events/:id/')},
        }, {stripTrailingSlashes: false});
    }
])

.factory('Tag', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('tags/:id/'), {id: '@id'}, {
            update: {method: 'PUT', url: API.route('tags/:id/')},
        }, {stripTrailingSlashes: false});
    }
])

.factory('Video', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('videos/:id/'), {id: '@id'},{
            //
        }, {stripTrailingSlashes: false});
    }
])

.factory('Projection', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('projections/:id/'), {id: '@id'},{
            //
        }, {stripTrailingSlashes: false});
    }
])
;
