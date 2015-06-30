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
      //
    }
])

.directive('videoPlayer',function() {

  var video;

  function link(scope,element,attrs) {
    attrs.$observe('src',function (value){
      video = value;
      videojs("video-"+"4", {
        controls : true,
        preload : 'metadata',
        width : '680',
        height : '440',
        plugins : {
           "resolutionSelector" : { "default_res" : "480" }
           }
        }, function(){
  // Player (this) is initialized and ready.
      });
    });
  }

  return {
     restrict : 'E',
     templateUrl : 'app/components/video/video-player.html',
  }
})
;
