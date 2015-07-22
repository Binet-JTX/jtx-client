'use strict';

angular.module('jtx.video', [
  "com.2fdevs.videogular",
	"com.2fdevs.videogular.plugins.controls",
	"com.2fdevs.videogular.plugins.overlayplay",
	"com.2fdevs.videogular.plugins.poster",
  "videogular.texttrack"
])

.config(['$stateProvider',
function($stateProvider) {
  $stateProvider
  .state('index.video', {
    url: 'video',
    templateUrl: 'app/components/video/video.html',
    controller: 'video.ctrl'
  })
  ;
}
])

.controller('video.ctrl',
['$scope',
function($scope) {
  $scope.config = {
				sources: [
					{src: "assets/videos/demons.mp4", type: "video/mp4"},
				],
				tracks: [
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					//poster: "http://www.videogular.com/assets/images/videogular.png"
          subtitle: [{
            src: "assets/videos/demons.vtt",
            kind: "subtitles",
            srclang: "fr",
            label: "Français",
          }],
          controls: {
              "autohide": true,
              "autohideTime": 3000
          },
				}
			};
}
])

.directive('jtxVideoPlayer',['$timeout', function(executeAfterDOMRendering) {

  function link(scope) {

  }

  return {
    restrict : 'E',
    templateUrl : 'app/components/video/video-player.html',
    link : link,
    scope: { videoObject: '=' },
  };
}]);
