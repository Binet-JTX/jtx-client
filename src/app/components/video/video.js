'use strict';

angular.module('jtx.video', [
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "com.2fdevs.videogular.plugins.buffering"
])

.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('index.video', {
                url: 'video',
                templateUrl: 'app/components/video/video.html',
                controller: 'video.ctrl',
                resolve: {
                    req_video: ['Video', function(Video) {
                        return Video.get({id: 1});
                    }]
                }
            });
    }
])

.controller('video.ctrl',
    ['$scope', 'req_video', 'Video',
    function($scope, req_video, Video) {
        $scope.video = req_video;
        $scope.video.date_diffusion = moment($scope.video.date_diffusion);
        Video.query().$promise.then(
            function(videos) {
                $scope.playlist = videos;
            }
        )

    }
])

.directive('jtxVideoPlayer', function() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/video/video-player.html',
        scope: {
            video: '='
        },
        controller: 'video.player.ctrl'
    };
})

.controller('video.player.ctrl',
    ['$scope', '$sce',
    function($scope, $sce) {
        var controller = this;
        controller.API = null;

        $scope.sources = function(vid) {
            var video_sources = [];
            _.forEach(vid.files, function(f) {
                video_sources.push({src: $sce.trustAsResourceUrl(f.path), type: "video/" + f.extension});
            });
            return video_sources;
        };
        $scope.tracks = function(vid) {
            if (vid.subtitles === null) {
                return [];
            }

            return [{
                src: $sce.trustAsResourceUrl(vid.subtitles.path),
                kind: "subtitles",
                srclang: "fr",
                label: "Français",
                default: false
            }];
        };

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };

        $scope.video.$promise.then(function(v) {
            controller.config = {
                sources: $scope.sources(v),
                tracks: $scope.tracks(v),
                theme: "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    poster: $scope.video.poster,
                    controls: {
                        "autohide": true,
                        "autohideTime": 1500
                    },
                }
            };

            controller.toggleSubtitles = function() {
                if (controller.config.tracks.length > 0) {
                    controller.config.tracks = [];
                } else {
                    controller.config.tracks = $scope.tracks(v);
                }
            };
        });
    }]
);
