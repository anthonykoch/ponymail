'use strict';

import React from 'react';
import classNames from 'classnames';
import assign from 'object-assign';

import { keys } from './../utils';

var Input = function (props) {
	return {
		props,

		value(value) {
			var input = this.refs.input;

			if (arguments.length) {
				input.value = value;
			}

			return input.value;
		},

		focus() {
			this.refs.input.focus();
		},

		clear() {
			this.refs.input.value = '';
		},

		callPropHandler(name, event) {
			var { onEnter, onEscape } = this.props;
			var propHandler = this.props[name];

			if (typeof propHandler === 'function') {
				propHandler(event);
			}

			if (typeof onEnter === 'function' && event.which === keys.enter) {
				onEnter(event);
			}

			if (typeof onEscape === 'function' && event.which === keys.esc) {
				onEscape(event);
			}
		},

		render() {
			var {
				callPropHandler,
				props: {
					attributes={},
					placeholder='',
					onChange,
				 }
			 } = this;

			var onKeyUpCaller =
				(typeof onKeyUp === 'function') ?
					this.callPropHandler.bind(this, 'onKeyUp') : null;

			return (
				<input
					ref="input"
					placeholder={placeholder}
					onChange={this.callPropHandler.bind(this, 'onChange')}
					onKeyDown={this.callPropHandler.bind(this, 'onKeyDown')}
					{...attributes} />
			);
		}
	};
};

export default Input;