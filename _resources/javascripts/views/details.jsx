'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { throttle } from './../utils';

/**
 * The details header. It is separated out into its
 * own function so it can be reused.
 * @param {Object} props
 */
export var DetailsHeader = function (props) {
	return {
		props,

		updateMarginTop() {
			if (this.refs.header) {
				this.props.setMarginTop(this.refs.header.offsetHeight);
			}
		},

		componentDidUpdate(prevProps, prevState) {
			this.updateMarginTop();
		},

		componentDidMount() {
			var onWindowResize = throttle(this.handleWindowResize.bind(this), 40);
			window.addEventListener('resize', onWindowResize);
			this.updateMarginTop();
		},

		handleWindowResize: function onWindowResize() {
			this.updateMarginTop();
		},

		shouldComponentUpdate(newProps) {
			var predicates = [
				this.props.title === newProps.title,
			];

			return ! predicates.every(bool => bool);
		},

		render() {
			var { title } = this.props;

			return (
				<div ref="header" className="details-pane__header">
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
export var DetailsView = function (props) {
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

				(onViewScroll) ? onViewScroll() : void 0;
				(isScrolledToBottom && onViewBottom) ? onViewBottom() : void 0;
			});
		},

		render() {
			var styles = {
				marginTop: this.props.marginTop
			};

			return (
				<div
					ref="view"
					className="details-pane__view"
					style={styles}
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
export var Details = function (props) {
	return {
		...React.Component.prototype,

		props,

		state: {
			// The margin top of the details view
			marginTop: void 0
		},

		/**
		 * Sets the marginTop style of the margin top of the details view
		 * @param {Number} marginTop
		 */
		setMarginTop(marginTop) {
			this.setState({ marginTop });
		},

		render() {
			var marginTop = this.state.marginTop;
			var children = React.Children.map(this.props.children, function(child) {
				return React.cloneElement(
					child,
					{
						marginTop,
						setMarginTop: this.setMarginTop.bind(this)
					});
			}, this);

			return (
				<section id="Details" className="details-pane">
					{children}
				</section>
			);
		}
	};
};