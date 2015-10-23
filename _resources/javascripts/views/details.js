'use strict';

import React from 'react';
import classNames from 'classnames';

/**
 * The details header. It is separated out into its
 * own function so it can be reused.
 * @param {Object} props
 */
var DetailsHeader = function (props) {
	return {
		props,

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.title === newProps.title,
			];

			return ! predicates.every(bool => bool);
		},

		render() {
			var { title } = this.props;

			return (
				<div className="details-pane__header">
					<div className="details-pane__top  [ flex flex--justify-between flex--items-center ]">
						<h1 className="details-pane__heading">
							{title}
						</h1>
						<div className="flex flex--nowrap flex--items-center">
							<input type="search" />
						</div>
					</div>
					{this.props.children}
				</div>
			);
		}
	};
};

/**
 * The portion of the details pane which shows under the
 * fixed header.
 */
var DetailsView = function (props) {
	return {
		props,

		/**
		 * Fires the onViewScroll props function, if one
		 * has been passed, as well as a onViewBottom, which
		 * fires when the view has been scrolled to the bottom
		 */
		onViewScroll() {
			requestAnimationFrame(() => {
				var view = this.refs.view;
				var scrollTop = view.scrollTop;
				var scrollHeight = view.scrollHeight;
				var offsetHeight = view.offsetHeight;
				var isScrolledToBottom = view.scrollHeight - view.scrollTop === view.clientHeight;
				var { onViewScroll, onViewBottom } = this.props;

				(onViewScroll) ? onViewScroll() : 0;
				(isScrolledToBottom && onViewBottom) ? onViewBottom() : 0;
			});
		},

		render() {
			return (
				<div
					ref="view"
					className="details-pane__view"
					onScroll={this.onViewScroll.bind(this)}
				>
					{this.props.children}
				</div>
			);
		}
	};
};

/**
 * The details pane
 * @param {Object} props
 */
var Details = function (props) {
	return {
		props,

		render() {
			return (
				<section id="Details" className="details-pane">
					{this.props.children}
				</section>
			);
		}
	};
};

export default { Details, DetailsView, DetailsHeader };