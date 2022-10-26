// ==== MAIN ==== //

var gulp = require('gulp');

// Default task chain: build -> browsersync -> watch
gulp.task('default', ['watch']);

// One-off setup tasks
gulp.task('setup', ['utils-normalize']);

// Build a working copy of the theme
gulp.task('build', ['scripts', 'styles', 'theme']);
gulp.task('build-dist', ['scripts-dist', 'styles-dist', 'theme']);

// NOTE: this is a resource-intensive task!
gulp.task( 'dist', [ 'utils-dist' ]);

// Generate POT files
gulp.task('potfiles', ['potfilesgen', 'build']);
