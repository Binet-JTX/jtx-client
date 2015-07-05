'use strict';

angular.module('jtx.api', [
    'ngResource'
])

.factory('API', ['$location',
    function ($location) {
        return {
            route: function (path) {
                if (/localhost/.test($location.absUrl())) {
                    return 'http://binet-jtx.com/dev/jtx-server/web' + (path == '' ? '' : '/' + path);
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
);
