(function() {
    'use strict';

    angular
        .module('jtx.video')
        .controller('VideoController', VideoController);

    /** @ngInject */
    function VideoController(req_video, Video, $state, moment) {
        var vm = this;

        vm.video = req_video;
        vm.video.date_diffusion = moment(vm.video.date_diffusion);
        Video.query().$promise.then(
            function(videos) {
                vm.playlist = videos;
            }
        )
    }

})();