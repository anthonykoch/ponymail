'use strict';

import React from 'react';
import SidebarButton from './../components/SidebarButton';
import SidebarHeading from './../components/SidebarHeading';
import SidebarLabel from './../components/SidebarLabel';
import paths from './../constants/paths';

/**
 * This is the email sidebar.
 * @param {Object} props
 */
var Sidebar = function (props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				//
			];

			return predicates.every(bool => ! bool);
		},

		render() {
			var { emailCounts, labels, currentPath, toggleAllUnchecked } = this.props;
			var styles = {
				input: {
					display: 'none'
				}
			};

			var labelItems = labels.map(function (props) {
				return (
					<SidebarLabel
						key={props.id}
						removeLabel={this.props.removeLabel}
						{...props} />
					);
			}, this);

			return (
				<div id="Sidebar">
					<input type="checkbox" className="is-hidden" id="mobile-checkbox" />

					<aside className="sidebar">

						<div className="sidebar__compose">
							<div className="u-text-center">
								<button className="[ button button--medium button--primary ]">
									Compose
								</button>
							</div>
						</div>

						<SidebarButton
							title="Inbox"
							icon="ion-ios-filing"
							id="inboxButton"
							path={paths.inbox}
							active={currentPath === paths.inbox}
							notificationType="alert"
							notification={emailCounts.inbox || ''}
							onClick={toggleAllUnchecked} />

						<SidebarButton
							title="Favorites"
							icon="ion-heart"
							id="favoritesButton"
							path={paths.favorites}
							active={currentPath === paths.favorites}
							notificationType="default"
							notification={emailCounts.favorites || ''}
							onClick={toggleAllUnchecked} />

						<SidebarButton
							title="Sent"
							icon="ion-paper-airplane"
							id="sentButton"
							path={paths.sent}
							active={currentPath === paths.sent}
							notificationType="default"
							notification={emailCounts.sent || ''}
							onClick={toggleAllUnchecked} />

						<SidebarButton
							title="Drafts"
							icon="ion-document-text"
							id="draftsButton"
							path={paths.drafts}
							active={currentPath === paths.drafts}
							notificationType="default"
							notification={emailCounts.drafts || ''}
							onClick={toggleAllUnchecked} />

						<SidebarButton
							title="Trash"
							icon="ion-trash-b"
							id="trashButton"
							path={paths.trash}
							active={currentPath === paths.trash}
							notificationType="default"
							notification={emailCounts.trash || ''}
							onClick={toggleAllUnchecked} />

						<div className="sidebar__separator"></div>

						<SidebarHeading />
						<ul>
							{labelItems}
						</ul>
					</aside>
				</div>
			);
		}
	};

};

export default Sidebar;