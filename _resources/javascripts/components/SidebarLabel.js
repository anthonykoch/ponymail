'use strict';

import React from 'react';
import classNames from 'classnames';

var SidebarLabel = function (props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.title === newProps.title
			];

			return ! predicates.every(bool => bool);
		},

		removeLabel() {
			this.props.removeLabel(this.props.id);
		},

		render() {
			var { active, title } = this.props;
			var classes = {
				labelButton: classNames({
					'labels__item__icon--active': active
				})
			};

			return (
				<li className="labels__item  button  button--reset">
					<span className="[ flex flex--justify-between flex--items-center ]">
						<button className="toggle-label  button--reset">
							<span className="[ button__icon button__icon--medium ]">
								<span className={`labels__item__icon ${classes.labelButton}`}>&nbsp;</span>
							</span>
							<span>{title}</span>
						</button>
						<button
							ref="close"
							onClick={this.removeLabel.bind(this)}
							className="[ button--reset ]">
							<span className="[ button__icon button__icon--close ]  ion-ios-close-empty"></span>
						</button>
					</span>
				</li>
			);
		}
	}
};

export default SidebarLabel;