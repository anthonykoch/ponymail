'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher';
import MailboxConstants from './../constants/MailboxConstants';

// This is probably not the way to do this,
// but I don't know how else to do it
import EmailStore from './../stores/EmailStore';

/**
 * Simulate request
 * @type {Object}
 */
var EmailClient = {
	load: function () {
		return new Promise(function (resolve, reject) {
			var time = 400;

			if (__oldEmails.length < 1200) {
				// save time scrolling
				time = 0;
			}

			setTimeout(function () {
				if (__oldEmails.length === 0) {
					reject();
				}

				resolve(__oldEmails.splice(0, 40));
			}, time);
		});
	}
};

/**
 * Actions for the email store
 */
var MailboxActions = {

	/**
	 * Sets the email in the preview pane
	 * @param {Object} email
	 */
	setPreview(email) {
		AppDispatcher.dispatch({
			action: MailboxConstants.SET_PREVIEW,
			data: { email }
		});
	},

	/**
	 * Adds emails to the
	 * @param {Object|Array.<Object>} emails
	 */
	add(emails) {
		AppDispatcher.dispatch({
			action: MailboxConstants.ADD_EMAIL,
			data: { emails }
		});
	},

	/**
	 * Remove the emails from the store
	 * @param  {Object|Array.<Object>} ids [description]
	 */
	remove(ids) {
		AppDispatcher.dispatch({
			action: MailboxConstants.REMOVE_EMAIL,
			data: { ids }
		});
	},

	/**
	 * Toggles the email item to be checked/selected
	 * @param  {Object} email
	 */
	toggleChecked(email) {
		AppDispatcher.dispatch({
			action: MailboxConstants.TOGGLE_CHECKED,
			data: { email }
		});
	},

	/**
	 * Unchecks/deselects all emails
	 * @param  {Array} emails
	 */
	toggleAllUnchecked() {
		AppDispatcher.dispatch({
			action: MailboxConstants.UNTOGGLE_ALL_CHECKED,
			data: {}
		});
	},

	/**
	 * awd
	 * @param  {Array} ids Array of email ids
	 */
	sendToTrash(ids) {
		AppDispatcher.dispatch({
			action: MailboxConstants.MARK_AS_SOFT_DELETED,
			data: { ids }
		});
	},

	/**
	 * Simulates a complete deletion of the emails by
	 * completely removing them from the store.
	 * @param  {Array} ids Array of email ids
	 */
	deleteEmails(ids) {
		AppDispatcher.dispatch({
			action: MailboxConstants.MARK_AS_HARD_DELETED,
			data: { ids }
		});
	},

	/**
	 * Toggles the isFavorited boolean property
	 * of the emails.
	 * @param  {Array} ids Array of email ids
	 */
	toggleFavorited(ids) {
		AppDispatcher.dispatch({
			action: MailboxConstants.TOGGLE_FAVORITED,
			data: { ids }
		});
	},

	/**
	 * Marks the emails with the following ids to be
	 * @param  {Array} ids Array of email ids
	 */
	markAsRead(ids) {
		AppDispatcher.dispatch({
			action: MailboxConstants.MARK_AS_READ,
			data: { ids }
		});
	},

	/**
	 * Not going to simulate a request, just add the dummy emails
	 */
	loadNextEmails() {
		if (EmailStore.isLoadingMoreEmails()) {
			console.log('already loading more')
			return;
		}

		AppDispatcher.dispatch({
			action: MailboxConstants.REQUEST_OLD_EMAILS,
			data: {}
		});
		EmailClient.load().then(function (emails) {
			AppDispatcher.dispatch({
				action: MailboxConstants.REQUEST_OLD_EMAILS_SUCCESS,
				data: { emails }
			});
		}, function () {
			AppDispatcher.dispatch({
				action: MailboxConstants.REQUEST_OLD_EMAILS_FAIL,
				data: {}
			});
		});
	},
};

export default MailboxActions;