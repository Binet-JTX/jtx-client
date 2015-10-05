(function() {
    'use strict';

    angular
        .module('jtx.video', [
            'ngResource',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'com.2fdevs.videogular.plugins.buffering'
        ]);

})();