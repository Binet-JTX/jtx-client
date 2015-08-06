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
                controller: 'video.ctrl'
            });
    }
])

.controller('video.ctrl', ['$scope',
    function($scope) {
        //
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

.controller('video.player.ctrl', ['$scope', function($scope) {
    var controller = this;
    controller.API = null;

    controller.onPlayerReady = function(API) {
        controller.API = API;
    };

    controller.config = {
        sources: [{
            src: "assets/videos/demons.mp4",
            type: "video/mp4"
        }, ],
        tracks: [{
            src: "assets/videos/demons.vtt",
            kind: "subtitles",
            srclang: "fr",
            label: "Français",
            default: true
        }],
        theme: "bower_components/videogular-themes-default/videogular.css",
        plugins: {
            //poster: "http://www.videogular.com/assets/images/videogular.png"
            controls: {
                "autohide": true,
                "autohideTime": 3000
            },
        }
    };

    controller.savedSubtitles = controller.config.tracks[0];

    controller.toggleSubtitles = function() {
        controller.API.changeSource([]);
    };
}]);
