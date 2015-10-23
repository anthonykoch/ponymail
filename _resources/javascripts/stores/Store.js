'use strict';

import StoreEmitter from './StoreEmitter';
import assign from 'object-assign';
import uniq from 'lodash/array/uniq';
import where from 'lodash/collection/where';

var Store = {
	...StoreEmitter,

	getAll: function () {
		return [...this.items];
	},

	/**
	 * Finds an object inside the array by its 'id' property
	 * @param  {String} id
	 * @return {Object}
	 */
	findById: function (id) {
		return this.items.filter(item => item.id === id).pop();
	},

	/**
	 * Removes the objects where the object's id matches one
	 * the id(s) passed.
	 * @param  {Array.<String>|String} ids
	 * @return {void}
	 */
	remove: function (ids) {
		ids = _toArray(ids);
		this.items = this.items.filter(({ id }) => ! ids.includes(id));

		return this;
	},

	/**
	 * Adds items to the list. Duplicate items are filtered so there
	 * is only one object with the same ID in the whole array.
	 * @param {Array.<Object>|Object} items
	 */
	add: function (items) {
		items = _toArray(items);
		this.items = uniq(this.items.concat(items), 'id');

		return this;
	},

	/**
	 * Sets the properties passed
	 * @param {Object} source
	 * @param {Object} props
	 * @return {this}
	 */
	update(ids, newProps) {
		ids = _toArray(ids);

		this.items = this.items.map(function (item) {
			if (ids.includes(item.id)) {
				item = assign({}, item, newProps)
			}

			return item;
		});

		return this;
	},

	updateAll(newProps) {
		this.items = this.items.map(function (item) {
			item = assign({}, item, newProps)

			return item;
		});

		return this;
	},

	/**
	 * Toggles a boolean attribute
	 * @return {void}
	 */
	toggle: function (ids, propName) {
		ids = _toArray(ids);

		this.items = this.items.map(function (item) {
			var prop = item[propName];

			if (ids.includes(item.id)) {
				item = assign({}, item, { [propName]: ! prop });
			}

			return item;
		});

		return this;
	},

	/**
	 * An alias for _.where
	 * @param {Object} props
	 * @return {Object}
	 */
	where(props) {
		return where(this.items, props);
	},

	_toArray
};

/**
 * Wraps the value in an array or returns the value
 * if it is already an array.
 * @param  {*} value
 * @return {Array}
 */
function _toArray(value) {
	if ( ! Array.isArray(value)) {
		value = [value];
	}

	return value;
}

export default Store;