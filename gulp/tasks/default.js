var gulp = require('gulp');

// Configure sublime
require('gulp-sublime').config({ gulp: gulp, dev: true });

gulp.task('default', ['browser-sync', 'watch']);