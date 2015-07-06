'use strict';

angular.module('jtx.api', [
    'ngResource'
])

.factory('API', ['$location',
    function ($location) {
        return {
            route: function (path) {
                if (/localhost:300/.test($location.absUrl())) {
                    return 'http://localhost/~camille/jtx-server/web/app_dev.php' + (path == '' ? '' : '/' + path);
                } else if (/localhost/.test($location.absUrl())) {
                    return 'http://binet-jtx.com/dev/jtx-server/web/app_dev.php' + (path == '' ? '' : '/' + path);
                } else {
                    return 'http://binet-jtx.com/dev/jtx-server/web/app_dev.php' + (path == '' ? '' : '/' + path);
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
.factory('TagKey', ['API', '$resource',
    function(API, $resource) {
        return $resource(API.route('tag/keys/:id'), {id: '@id'});
    }]
)
;
