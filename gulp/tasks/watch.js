'use strict';

var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function () {
	var watchers = [
		gulp.watch(config.sass.src, ['sass']),
	];
});

