import React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/lang/isEqual';

/**
 * An item of the mailbox list
 * @param {Object} props
 */
var EmailListItem = function (props) {
	return {
		...React.Component.prototype,

		props,

		shouldComponentUpdate(newProps) {
			var oldEmail = this.props.email;
			var newEmail = newProps.email;

			var predicates = [
				oldEmail.isRead === newEmail.isRead,
				oldEmail.isChecked === newEmail.isChecked,
				isEqual(oldEmail.labels, newEmail.labels)
			];

			return ! predicates.every(bool => bool);
		},

		/**
		 * If the checkbox is clicked,
		 * @param {Event} event
		 */
		toggleChecked(event) {
			var { email, toggleChecked } = this.props;
			var checkbox = this.refs.checkbox;

			if (event.target === checkbox) {
				toggleChecked(email);
			}
		},

		/**
		 * Only set the preview if the checkbox wrapper wasn't clicked.
		 */
		setPreview(event) {
			var { email, setPreview } = this.props;
			var wrapper = this.refs.checkboxWrapper;

			// Don't preview if the checkbox area was clicked
			if ( ! wrapper.contains(event.target)) {
				this.props.setPreview(email);
			}
		},

		render() {
			var { date, isChecked } = this.props.email;

			var classes = {
				checkbox: classNames({
					'email-list__item__checkbox--checked': isChecked
				}),
			};

			var result = (
				<li
					onClick={this.setPreview.bind(this)}
					className={`email-list__item  ${classes.email} ${this.props.className}`}>
					<div
						ref="checkboxWrapper"
						className="email-list__item__checkbox-wrapper"
					>
						<label
							ref="checkbox"
							onClick={this.toggleChecked.bind(this)}
							className={`email-list__item__checkbox  ${classes.checkbox}`}
						>
							<input className="is-hidden" type="checkbox" />
						</label>
					</div>
					{this.props.children}
				</li>
			);

			return result
		}
	};
};

export default EmailListItem;