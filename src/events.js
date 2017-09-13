define([
], function () {
    /**
     * @constructor
     * @description
     * A module to attach and fire events on an element.
     *
     * @exports events
     */
    function Events () {}

    /**
     * Registers multiple events to an element with callback.
     *
     * @memberOf module:events
     *
     * @param {object} ele Element to listener on
     * @param {string} eventTypes Event names separated by spaces
     * @param {function} handler Function that will be called when the
     *                           events are triggered.
     *
     * @example
     * ```js
     * var ele = '<div>Some element</div>',
     * 	type = 'click mouseover',
     * 	eventHandler = function () {
     * 		console.log('Log on click and mouse over')
     * 	};
     *
     * events.addListeners(ele, type, eventHandler);
     * ```
     */
    Events.prototype.addListeners = function (ele, eventTypes, handler) {
        var $this = this,
            events = eventTypes.split(' ');

        for (var i = 0, len = events.length; i < len; i++) {
            $this.addListener(ele, events[i], handler);
        }
    };

    /**
     * Registers event to an element with callback. If an event already
     * exists on the element, we add the function to our own event system.
     *
     * @memberOf module:events
     *
     * @param {object} ele Element to listener on
     * @param {string} eventType Event name
     * @param {function} handler Function that will be called when this event is triggered.
     */
    Events.prototype.addListener = function (ele, eventType, handler) {
        var $this = this;

        ele.rbevents = ele.rbevents || [];

        if (!ele.rbevents[eventType]) {
            ele.rbevents[eventType] = [];
            // If the same event exists, register it
            // with our own event system.
            if (ele['on' + eventType]) {
                ele.rbevents[eventType].push(ele['on' + eventType]);
            }
            // Replace with our own
            ele['on' + eventType] = function (event) {
                event = event || window.event;
                $this.handleEvent(ele, {
                    type: eventType
                }, event);
            };
        }

        ele.rbevents[eventType].push(handler);
    };

    /**
     * Fires any registered events.
     *
     * @protected
     * @memberOf module:events
     *
     * @param {object} ele Element to fire registered events from
     * @param {object} event Event object
     * @param {object} data Data to pass with event
     */
    Events.prototype.handleEvent = function (ele, event, data) {
        var eventType = event.type;

        if (ele.rbevents && ele.rbevents[eventType]) {
            var handlers = ele.rbevents[eventType];

            if (event) {
                event.preventDefault = function () {
                    if (data.preventDefault) {
                        data.preventDefault();
                    }
                    data.returnValue = false;
                };
                event.stopPropagation = function () {
                    if (data.stopPropagation) {
                        data.stopPropagation();
                    }
                    data.cancelBubble = true;
                };
            }

            for (var i = 0, len = handlers.length; i < len; i++) {
                if (typeof handlers[i] === 'function') {
                    handlers[i](event, data);
                }
            }

            // clean removed handlers.
            for (var x = 0; x < handlers.length; x++) {
                if (typeof handlers[i] === 'function') {
                    handlers.splice(x, 1);
                }
            }
        }
    };

    /**
     * Remove a registered event from an element
     *
     * @public
     * @memberOf module:events
     *
     * @param {object} ele Element to remove a registered event from
     * @param {string} eventType Event name
     * @param {function} handler Function that was originally called when this event is triggered.
     */
    Events.prototype.removeEvent = function (ele, eventType, handler) {
        if (ele.rbevents && ele.rbevents[eventType]) {
            var handlers = ele.rbevents[eventType];

            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === handler) {
                    handlers[i] = false;
                }
            }
        }
    };

    /**
     * Trigger an event on a given element.
     * @param {object} ele Element to trigger an event from
     * @param {string} eventType Event name
     * @param {object} data    Data to pass with event
     */
    Events.prototype.triggerEvent = function (ele, eventType, data) {
        data = data || {};
        this.handleEvent(ele, {
            type: eventType
        }, data);
    };

    return Events;
});
