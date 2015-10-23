'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import LabelConstants from './../constants/LabelConstants';

var PreviewActions = {

	/**
	 * Ads the labels to the store
	 * @param  {Array.<Object>} labels
	 */
	add(labels) {
		AppDispatcher.dispatch({
			action: LabelConstants.ADD_LABEL,
			data: { labels }
		});
	},

	/**
	 * Removes the labels from the store
	 * @param  {Array.<Strings>} ids
	 */
	remove(ids) {
		AppDispatcher.dispatch({
			action: LabelConstants.REMOVE_LABEL,
			data: { ids }
		});
	}
};

export default PreviewActions;