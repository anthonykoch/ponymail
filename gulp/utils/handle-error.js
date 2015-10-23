var gulp = require('gulp');
var sublime = require('gulp-sublime');

var handleError = function handleError(taskName) {
	if (typeof taskName !== 'string') {
		var err = new Error('No task name was specified for the error handler');
		throw err;
	}

	var plumberErrorHandler = {
		errorHandler: function (err) {
			sublime.showError(err, taskName)
			console.log(err.message);
			this.emit('end');
		}
	};

	return plumberErrorHandler;
};

module.exports = handleError;

