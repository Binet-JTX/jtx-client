'use strict';

angular.module('jtx.video', [
  //
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
  $scope.demons = {
    files : [
      { resolution : "1080",
      src : "assets/videos/demonsdesylvie.mp4",
      extension : "mp4",
      subtitles : "assets/videos/demonsdesylvie.vtt",
      }
    ],
    id : "1"
  };
  $scope.config = {
				sources: [
					{src: "src/assets/videos/demons.mp4", type: "video/mp4"},
				],
				tracks: [
					{
						src: "src/assets/videos/demons.vtt",
						kind: "subtitles",
						srclang: "fr",
						label: "Sous-titres",
						default: ""
					}
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					//poster: "http://www.videogular.com/assets/images/videogular.png"
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
