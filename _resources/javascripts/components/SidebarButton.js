'use strict';

import { Link } from 'react-router';
import React from 'react';
import classNames from 'classnames';

function SidebarButton(props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.notification === newProps.notification,
				this.props.active === newProps.active,
			];

			return ! predicates.every(bool => bool);
		},

		onClick(event) {
			var { onClick } = this.props;
			(onClick && event.target === this.refs.wrapper) ? onClick() : 0;
		},

		render() {
			var {
				notificationType,
				notification,
				title,
				icon,
				path,
				active
			} = this.props;

			var classes = {
				button: classNames({
					'sidebar__button--active': active,
				}),
				notification: classNames({
					'button__notification--active': active,
					['button__notification--' + notificationType]: typeof notificationType === 'string'
				})
			};
			var styles = {
				notification: {
					visibility: (notification === '') ? 'hidden' : ''
				}
			};

			return (
				<Link
					to={path}
					ref="button"
					className={`sidebar__button  button  ${classes.button}`}
					role="button">
					<span
						ref="wrapper"
						onClick={this.onClick.bind(this)}
						className="[ flex flex--items-center flex--justify-between ]">
						<span>
							<i className={`u-align-middle  button__icon button__icon--medium  [ ion ${icon} ]`}></i>
							<span className="u-align-middle">{title}</span>
						</span>
						<span
							style={styles.notification}
							className={`button__notification  button__notification--right  ${classes.notification}`}>
								{notification}
						</span>
					</span>
				</Link>
			);
		}
	}
}

export default SidebarButton;