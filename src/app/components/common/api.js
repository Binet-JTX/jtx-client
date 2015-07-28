'use strict';

angular.module('jtx.api', [
    'ngResource'
])

.factory('API', ['$location',
    function ($location) {
        return {
            route: function (path) {
              if (/localhost/.test($location.absUrl())) {
                    return 'http://binet-jtx.com/api' + (path == '' ? '' : '/' + path);
                } else {
                    return 'http://binet-jtx.com/api' + (path == '' ? '' : '/' + path);
                }
            }
        };
    }
])

.factory('Event', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('events/:id'), {id: '@id'}, {
            update: {method: 'PUT', url: API.route('events/:id')},
        });
    }]
)
.factory('Tag', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('tags/:id'), {id: '@id'});
    }]
)
.factory('Video', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('video/:id'), {id: '@id'});
    }]
)
;
