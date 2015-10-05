(function() {
    'use strict';

    angular
        .module('jtx.video')
        .config(VideoRouter);

    /** @ngInject */
    function VideoRouter($stateProvider) {
        $stateProvider
            .state('index.video', {
                url: 'video/{id:[0-9]+}',
                templateUrl: 'app/components/video/video.html',
                controller: 'VideoController',
                controllerAs: 'videoCtl', 
                resolve: {
                    req_video: ['Video', '$stateParams', function(Video, $stateParams) {
                        return Video.get({id: $stateParams.id});
                    }]
                }
            })
        ;
    }
})();
