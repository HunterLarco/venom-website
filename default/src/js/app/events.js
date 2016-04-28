/**
 * Simple Events mixin
 * ------------------------------------------------------
 * Usage: Events.call(this);
 */
;(function (root, undefined) {

	function Events () {
		this._events = {};

		this.on = function (event, fct) {
				this._events[event] = this._events[event] || [];
				this._events[event].push(fct);
				return this;
		};

		this.off = function (event, fct) {
				if ( ! (event in this._events) ) return this;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
				return this;
		};

		this.trigger =  function (event) {
			var argsAll = Array.prototype.slice.call(arguments, 0), args = argsAll.slice(1);
			var eventsLength;
			argsAll.unshift('*');
			if (event !== '*') this.trigger.apply(this, argsAll);
			if ( ! (event in this._events) ) return this;
			eventsLength = this._events[event].length;
			for (var i = 0; i < eventsLength; i++) {
				this._events[event][i].apply(this, args);
			}
			return this;
		};
	}

	// Expose to window object
	root.Events = Events;

})(this);