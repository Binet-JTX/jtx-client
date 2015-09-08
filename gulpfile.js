// 'use strict';

// var gulp = require('gulp');
// var gutil = require('gulp-util');
// var wrench = require('wrench');

// var options = {
//   src: 'src',
//   dist: 'dist',
//   tmp: '.tmp',
//   e2e: 'e2e',
//   errorHandler: function(title) {
//     return function(err) {
//       gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
//       this.emit('end');
//     };
//   },
//   wiredep: {
//     directory: 'bower_components',
//     exclude: [/jquery/, /bootstrap\.js/]
//   }
// };

// wrench.readdirSyncRecursive('./gulp').filter(function(file) {
//   return (/\.(js|coffee)$/i).test(file);
// }).map(function(file) {
//   require('./gulp/' + file)(options);
// });

// gulp.task('default', ['clean'], function () {
//     gulp.start('build');
// });

/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
