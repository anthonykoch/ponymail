'use strict';

import assign from 'object-assign';
import storage from 'store';
import moment from 'moment';
import AppDispatcher from './../dispatcher/AppDispatcher';
import MailboxConstants from './../constants/MailboxConstants';
import { filters } from './../constants/EmailConstants';
import Store from './Store';

var _isLoadingMoreEmails = false;

/**
 * The email the user is previewing, for the demo
 * it is defaulted to the one in the design.
 * @type {Object}
 */
var _previewEmail = {
	title: 'Theory of Design',
	sender: 'Victor Erixon',
	labels: [],
	deleted: false,
	date: moment(),
	body: `
	<div>
		<p>
			Hello World,
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex quia optio, tempora pariatur mollitia sapiente placeat molestiae iusto necessitatibus vero fugit quisquam, facilis saepe velit expedita, veritatis aliquam laborum nam quaerat magni. Voluptatibus libero impedit, obcaecati aliquid esse porro facilis?
		</p>

		<blockquote>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, distinctio!
			</p>
		</blockquote>

		<p>
			Can you believe that? Sit vero maiores sint voluptatum et, consequatur, tempora eaque aliquid suscipit hic, quod nobis ducimus modi debitis corporis assumenda nesciunt cum. Fugiat blanditiis eos cumque fuga deleniti nihil ducimus fugit unde doloribus ipsa.
		</p>
		<p>
			In closing, quaerat facere mollitia cum asperiores recusandae ut doloremque magni nesciunt a temporibus accusamus error culpa eaque, consequatur qui, architecto saepe vitae? Eligendi.
		</p>
	</div>`,
};




/**
 * The store that holds every email type, whether they be
 * drafts, inbox emails, deleted, etc. They emails are
 * filtered by the mailbox components using the email
 * filters in email constants.
 * @type {Object}
 */
var EmailStore = {
	...Store,

	items: __initialEmails.concat(__initialDrafts),

	/**
	 * Returns the number of emails in each box.
	 *
	 * Could definitely optimize this, but since this is
	 * just a demo, I'm leaving this as is.
	 * @return {Object}
	 */
	getEmailCounts() {
		var emails = this.items;

		var counts = {
			inbox:     0,
			favorites: 0,
			sent:      0,
			drafts:    0,
			trash:     0,
		};

		for (var i = 0, length = emails.length; i < length; i++) {
			var email = emails[i];

			var { isDraft, isSent, isSoftDeleted, isHardDeleted, isRead, isFavorited } = email;


			if ( ! isDraft && ! isRead && ! isSoftDeleted && ! isHardDeleted) {
				counts.inbox++;
			}
			if (isFavorited && ! isSoftDeleted && ! isHardDeleted) {
				counts.favorites++;
			}
			if (isDraft && isSent && ! isSoftDeleted && ! isHardDeleted) {
				counts.sent++;
			}
			if (isDraft && ! isSent && ! isSoftDeleted && ! isHardDeleted) {
				counts.drafts++;
			}
			if ( ! isDraft && isSoftDeleted && ! isHardDeleted) {
				counts.trash++;
			}
		}

		return counts;
	},

	getEmailUserIsPreviewing() {
		return _previewEmail;
	},

	isLoadingMoreEmails() {
		return _isLoadingMoreEmails;
	}
};




var token = AppDispatcher.register(function (payload) {
	var { action, data: { ids, email, emails } } = payload;

	switch (action) {
		case MailboxConstants.ADD_EMAIL:
			EmailStore.add(emails);
			break;

		case MailboxConstants.REMOVE_EMAIL:
			EmailStore.remove(emails);
			break;

		case MailboxConstants.TOGGLE_CHECKED:
			EmailStore.toggle(email.id, 'isChecked');
			break;

		case MailboxConstants.TOGGLE_ALL_CHECKED:
			EmailStore.updateAll({ isChecked: true });
			break;

		case MailboxConstants.UNTOGGLE_ALL_CHECKED:
			EmailStore.updateAll({ isChecked: false });
			break;

		case MailboxConstants.TOGGLE_FAVORITED:
			EmailStore.toggle(ids, 'isFavorited');
			break;

		case MailboxConstants.MARK_AS_READ:
			EmailStore.update(email.id, { isRead: true });
			break;

		case MailboxConstants.MARK_AS_SOFT_DELETED:
			EmailStore.update(ids, { isSoftDeleted: true, isChecked: false });
			break;

		case MailboxConstants.MARK_AS_HARD_DELETED:
			EmailStore.update(ids, { isHardDeleted: true, isChecked: false });
			break;

		case MailboxConstants.SET_PREVIEW:
			_previewEmail = email;
			EmailStore.update(email.id, { isRead: true });
			break;

		case MailboxConstants.REQUEST_OLD_EMAILS:
			_isLoadingMoreEmails = true;
			break;

		case MailboxConstants.REQUEST_OLD_EMAILS_SUCCESS:
			_isLoadingMoreEmails = false;
			EmailStore.add(emails);
			break;

		case MailboxConstants.REQUEST_OLD_EMAILS_FAIL:
			_isLoadingMoreEmails = false;
			break;

		default:
			return true;
	}

	EmailStore.emitChange();

	return true;
});

export default EmailStore;