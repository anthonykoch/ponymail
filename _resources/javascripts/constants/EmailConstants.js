'use strict';

export const filters = {
	INBOX:     { isDraft: false,    isSoftDeleted: false, isHardDeleted: false },
	FAVORITES: { isFavorited: true, isSoftDeleted: false, isHardDeleted: false },
	SENT:      { isDraft: true, isSent: true,  isHardDeleted: false, isSoftDeleted: false },
	DRAFTS:    { isDraft: true, isSent: false, isHardDeleted: false },
	TRASH:     { isDraft: false, isSoftDeleted: true, isHardDeleted: false },
};