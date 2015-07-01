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
function($scope) {;
  $scope.demons = {
    files : [
      { resolution : "1080",
      src : "assets/videos/demonsdesylvie.mp4",
      extension : "mp4",
      subtitles : "assets/videos/demonsdesylvie.vtt",
      }
    ],
    id : "1"
  }
}
])

.directive('jtxVideoPlayer',['$timeout', function(executeAfterDOMRendering) {

  function link(scope) {
    executeAfterDOMRendering(videojs("video-"+scope.videoObject.id, {
      controls : true,
      preload : 'metadata',
      width : '680',
      height : '440',
      plugins : {
        "resolutionSelector" : { "default_res" : "480" }
      }
    }, function(){
      // Player (this) is initialized and ready.
    }));
  };

  return {
    restrict : 'E',
    templateUrl : 'app/components/video/video-player.html',
    link : link,
    scope: { videoObject: '=' },
  };
}]);
