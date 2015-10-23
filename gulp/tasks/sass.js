var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename       = require('gulp-rename');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var config       = require('../config').sass;
var handleError  = require('../utils/handle-error');
var cssminify    = require('gulp-minify-css');

gulp.task('sass', function (done) {
	return gulp.src(config.src)
		.pipe(plumber(handleError('sass')))
		.pipe(sass(config.settings.sass))
		.pipe(autoprefixer(config.settings.autoprefixer))
		.pipe(cssminify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest(config.siteDest))
		.pipe(browserSync.reload({ stream: true }))
		.pipe(gulp.dest(config.dest))
});


