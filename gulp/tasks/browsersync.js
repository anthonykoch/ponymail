'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('./../config').browserSync;

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		},
		notify: false,
		open: false,
		injectChanges: true,
		middleware: [require('compression')()]
	});
});