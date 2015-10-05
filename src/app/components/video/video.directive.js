(function() {
    'use strict';

    angular
        .module('jtx.video')
        .directive('jtx-video-player', VideoPlayerDirective);

    /** @ngInject */
    function VideoPlayerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/video/video-player.html',
            scope: {
                video: '='
            },
            controller: 'VideoPlayerController',
            controllerAs: 'vpCtl'
        };
    }

    /** @ngInject */
    function VideoPlayerController($sce) {
        var vm = this;
        vm.API = null;

        vm.sources = function(vid) {
            var video_sources = [];
            _.forEach(vid.files, function(f) {
                video_sources.push({src: $sce.trustAsResourceUrl(f.path), type: "video/" + f.extension});
            });
            return video_sources;
        };
        vm.tracks = function(vid) {
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

        vm.onPlayerReady = function(API) {
            vm.API = API;
        };

        vm.video.$promise.then(function(v) {
            vm.config = {
                sources: vm.sources(v),
                tracks: vm.tracks(v),
                theme: "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    poster: vm.video.poster,
                    controls: {
                        "autohide": true,
                        "autohideTime": 1500
                    }
                }
            };

            vm.toggleSubtitles = function() {
                if (vm.config.tracks.length > 0) {
                    vm.config.tracks = [];
                } else {
                    vm.config.tracks = vm.tracks(v);
                }
            };
        });
    }
})();