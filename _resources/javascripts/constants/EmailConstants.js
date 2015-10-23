'use strict';

/**
 * Uses string objects so that each one is unique, but we can
 * still treat is a regular string.
 */

export default {
	filters: {
		INBOX:     { isDraft: false,    isSoftDeleted: false, isHardDeleted: false },
		FAVORITES: { isFavorited: true, isSoftDeleted: false, isHardDeleted: false },
		SENT:      { isDraft: true, isSent: true,  isHardDeleted: false, isSoftDeleted: false },
		DRAFTS:    { isDraft: true, isSent: false, isHardDeleted: false },
		TRASH:     { isDraft: false, isSoftDeleted: true, isHardDeleted: false },
	}
};