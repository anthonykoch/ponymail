'use strict';

var gulp = require('gulp');

var handleError = function handleError(taskName) {
	if (typeof taskName !== 'string') {
		var err = new Error('No task name was specified for the error handler');
		throw err;
	}

	var plumberErrorHandler = {
		errorHandler: function (err) {
			console.log(err.message);
			this.emit('end');
		}
	};

	return plumberErrorHandler;
};

module.exports = handleError;

