'use strict';

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

/**
 * This is the preview pane for the email
 * @param {Object} props
 */
var Preview = function (props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.email.id === newProps.email.id
			];

			return predicates.every(bool => ! bool);
		},

		render() {
			var { email } = this.props;
			var preview;

			if (email && typeof email === 'object') {
				preview = this.renderPreview();
			}

			return (
				<section className="preview-pane">
					{preview}
				</section>
			);
		},

		renderPreview() {
			var { email: { date, title, sender, body } } = this.props;
			var formattedDate = (date) ? date.format('Mo MMMM, h:mma') : '';

			return (
				<div>
					<header className="preview-pane__header">
						<h1 className="preview-pane__heading">
							{title}
						</h1>
						<ul className="preview-pane__meta">
							<li className="preview-pane__meta__item  preview-pane__from">from {sender}</li>
							<li className="preview-pane__meta__item  preview-pane__date">{formattedDate}</li>
							<li className="[ preview-pane__meta__item preview-pane__meta__item--more ]">
								<i className="ion ion-ios-arrow-down"></i>
							</li>
						</ul>
					</header>
					<section dangerouslySetInnerHTML={{__html: body || ''}} className="preview-pane__body"></section>
				</div>
			);
		}
	};
};

export default Preview;