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
  })
  ;
}
])

.controller('video.ctrl',
['$scope',
function($scope) {
  //
}])

.directive('jtxVideoPlayer', function() {

  return {
    restrict : 'E',
    templateUrl : 'app/components/video/video-player.html',
    scope: { video: '=' },
    controller: ['$scope', function($scope) {
      $scope.API = null;

    	$scope.onPlayerReady = function(API) {
        $scope.API = API;
      };

      $scope.config = {
    				sources: [
    					{src: "assets/videos/demons.mp4", type: "video/mp4"},
    				],
    				tracks: [
              {
                src: "assets/videos/demons.vtt",
                kind: "subtitles",
                srclang: "fr",
                label: "Français",
                default: true
              }
    				],
    				theme: "bower_components/videogular-themes-default/videogular.css",
    				plugins: {
    					//poster: "http://www.videogular.com/assets/images/videogular.png"
              controls: {
                  "autohide": true,
                  "autohideTime": 3000
              },
    				}
    			};

    }]
  };
})

.directive("jtxSubtitlesButton", function() {
   return {
     restrict: "E",
     require: "^videogular",
     scope: { subtitles: '='},
     template: "<a ng-click='toggleSubtitles()'>Sous-titres</a>",
     controller : ['$scope', function($scope) {
       $scope.savedSubtitles = $scope.subtitles;
       $scope.toggleSubtitles = function() {
         var API = $scope.$parent.API;
         if ($scope.subtitles == null) {
           var currentTime = API.currentTime
           API.stop();
           $scope.subtitles = $scope.savedSubtitles;
           console.log("Sous-titres activés");
           API.seekTime(currentTime/1000);
           API.play();
         } else {
           var currentTime = API.currentTime
           $scope.subtitles = null ;
           console.log("Sous-titres désactivés");
           API.seekTime(currentTime/1000);
           API.play();
         }
       }
     }]
   }
});
