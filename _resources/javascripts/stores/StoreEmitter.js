import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

var StoreEmitter = {
	emitChange(...args) {
		args.unshift(CHANGE_EVENT);
		this.emit.apply(this, args);
	},

	addChangeListener(listener) {
		this.on(CHANGE_EVENT, listener);
	},

	removeChangeListener(listener) {
		this.removeListener(CHANGE_EVENT, listener);
	},
};

Object.assign(StoreEmitter, EventEmitter.prototype);

export default StoreEmitter;