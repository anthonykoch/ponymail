'use strict';

import React from 'react';

var SidebarHeading = function (props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.title === newProps.title
			];

			return ! predicates.every(bool => bool);
		},

		onActionClick(event) {

		},

		render() {
			var { action, onActionClick=this.onActionClick } = this.props;

			return (
				<h5 className="sidebar__heading  [ flex flex--justify-between flex--items-center ]">
					<span>Labels</span>
					<label
						ref="action"
						onClick={onActionClick}
						id="sidebar__add-label"
						htmlFor="sidebar__label-input"
						className="[ ion ion-plus ]  sidebar__heading-action">
					</label>
				</h5>
			);
		}
	}
};

export default SidebarHeading;