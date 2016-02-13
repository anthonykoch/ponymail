'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import LabelConstants from './../constants/LabelConstants';
import Store from './Store';

var LabelStore = {
	...Store,
	items: __initialLabels
};

AppDispatcher.register(function (payload) {
	var { action, data: { ids, labels } } = payload;

	console.log(action.valueOf());

	switch (action) {
		case LabelConstants.ADD_LABEL:
			LabelStore.add(labels);
			break;

		case LabelConstants.REMOVE_LABEL:
			LabelStore.remove(ids);
			break;

		default:
			return true;
	}

	LabelStore.emitChange();

	return true;
});

export default LabelStore;