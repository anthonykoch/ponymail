'use strict';

/**
 * Creates a unique id. from todomvc https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/utils.js
 * @return {String}
 */
export function createUID() {
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : i === 16 ? random & 3 | 8 : random).toString(16);
	}

	return uuid;
};

export var keys = {
	enter:  13,
	esc:    27,
	escape: 27,
};

/**
 * Wraps the function passed and only allows it to be called
 * every few milliseconds.
 * @param  {Function} fn          The function that will be called when the time has passed
 * @param  {Number}   time        The number of milliseconds to throttle
 * @param  {*}        thisBinding The value to be used as "this" in the function called
 * @return {Function}
 */
export function throttle(fn, threshold=200, thisBinding) {
	var last, timeoutID;

	return function () {
		var now = Date.now();
		var timeSinceLastCall = now - last + threshold;
		// If no thisBinding was passed, use the value of "this" here
		var context = thisBinding === null || thisBinding === undefined ? this : thisBinding;

		if (last && now < last + threshold) {
			clearTimeout(timeoutID);
			timeoutID = setTimeout(function call() {
				fn.call(context, arguments);
				last = now;
			}, threshold);
		} else {
			last = now;
			fn.apply(context, arguments);
		}
	};
}

export default { createUID, keys };