angular.module('jtx.admin.video', [
    //
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.admin.video', {
                url: '/video',
                abstract: true,
                template: '<ui-view />',
            })
            .state('index.admin.video.add', {
                url: '/add',
                templateUrl: 'app/components/admin/video/add.html',
                controller: 'admin.video.add.ctrl',
            });
    }
])

.controller('admin.video.add.ctrl', ['$scope', '$resource', 'Video', function($scope, $resource, Video) {
    $scope.video = {
        "id": 1,
        "title": "Branleurs",
        "description": "Un clip de branlette cinématographique comme on n'en a jamais vu au JTX...",
        "date_diffusion": "2015-06-10T20:30:00Z",
        "views": 0,
        "complete": false,
        "poster": "http://binet-jtx.com/api/media/posters/videos/branleurs.png",
        "created_at": "2015-08-05T22:53:22Z",
        "updated_at": "2015-08-05T22:53:22Z",
        "deleted_at": null,
        "deleted": false
    };
}]);
