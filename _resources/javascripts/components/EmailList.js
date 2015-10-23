'use strict';

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import EmailListItem from './EmailListItem.js';
import { filters as EmailFilters } from './../constants/EmailConstants';

var MailboxList = function (props, state) {
	return {
		props,

		render() {
			var { emails, isLoadingMoreEmails, setPreview, toggleChecked } = this.props;

			emails.sort(function sortByDate(a, b) {
				return b.date.toDate() - a.date.toDate();
			});

			var styles = {
				spinner: {
					display: (isLoadingMoreEmails) ? 'block' : 'none'
				},
			};

			var emailItems = emails.map(function (email) {
				var { id, sender, recipients, title, labels=[], date, isRead } = email;
				var formattedDate = this.formateDate(date);
				var labelItems = labels.map(function (label) {
					return (<li className="email-list__item__label" key={label}>{label}</li>);
				});

				var classes = {
					email: classNames({
						'inbox__item--unread': isRead === false,
						'inbox__item': true
					})
				};

				return (
					<EmailListItem key={id}
						email={email}
						className={classes.email}
						toggleChecked={toggleChecked}
						setPreview={setPreview}
					>
						<div className="email-list__item-container">
							<div className="flex  u-overflow-x-hidden">
								<div className="email-list__item__person">{sender || recipients.to}</div>
								<div className="email-list__item__title">
									<ul className="email-list__item__labels">
										{labelItems}
									</ul>
									{title}
								</div>
							</div>
							<div className="email-list__item__date">{formattedDate}</div>
						</div>

					</EmailListItem>
				);
			}, this);

			return (
				<div>
					<ul>
						{emailItems}
					</ul>
					<div style={styles.spinner} className="loading-indicator">
						<div className="spinner"></div>
					</div>
				</div>
			);
		},

		/**
		 * Formats the date as 0:00 if the email was sent or made today,
		 * or "Jan 1" if later than today.
		 * @param  {Moment} date
		 * @return {String}
		 */
		formateDate(date) {
			if (this.isSameDate(moment(), date)) {
				return date.format('h:mma');
			} else {
				return date.format('MMM D');
			}
		},

		/**
		 * Returns true if both dates, year, and month are the same.
		 * @param  {Moment}  now
		 * @param  {Moment}  date
		 * @return {Boolean}
		 */
		isSameDate(now, date) {
			return now.date() === date.date() && now.year() === date.year() && now.month() === date.month();
		},
	};
};

export default MailboxList;