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
      videojs("video", {
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
    }
])
;
