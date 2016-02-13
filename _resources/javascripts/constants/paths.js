'use strict';

var prefix = '';

/**
 * Have to do this because it's hosted on github project pages
 * at anthonykoch.com/ponymail (anthonykoch.github.io reroutes to anthonykoch.com).
 */

if (process.env.NODE_ENV.toLowerCase() === 'production') {
	prefix = '/ponymail'
}

export default {
	inbox:     `${prefix}/inbox`,
	favorites: `${prefix}/favorites`,
	sent:      `${prefix}/sent`,
	drafts:    `${prefix}/drafts`,
	trash:     `${prefix}/trash`,
};