'use strict';

/**
 * Creates a unique id. from todomvc https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/utils.js
 * @return {String}
 */
function createUID() {
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

var keys = {
	enter:  13,
	esc:    27,
	escape: 27,
};

function noop() {}

export default { createUID, keys, noop };