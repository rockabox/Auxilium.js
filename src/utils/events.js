/**
 * A module to attach and fire events on an element.
 * @module utils/events
 */
define([
], function () {
    /**
     * @constructor
     * @memberOf module:utils/events
     */
    function Events () {}

    /**
     * Registers event to an element with callback. If an event already
     * exists on the element, we add the function to our own event system.
     *
     * @memberOf module:utils/events
     *
     * @param {object} ele Element to listener on
     * @param {string} eventType Event name
     * @param {function} handler Function that will be called when this
     *                           event is triggered.
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
     * @memberOf module:utils/events
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
                    this.returnValue = false;
                };
                event.stopPropagation = function () {
                    this.cancelBubble = true;
                };
            }

            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i](event, data);
            }
        }
    };

    /**
     * Remove a registered event from an element
     *
     * @public
     * @memberOf module:utils/events
     *
     * @param {object} ele Element to remove a registered event from
     * @param {string} eventType Event name
     * @param {function} handler Function that was originally called when
     *                            this event is triggered.
     */
    Events.prototype.removeEvent = function (ele, eventType, handler) {
        if (ele.rbevents && ele.rbevents[eventType]) {
            var handlers = ele.rbevents[eventType];

            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] == handler) {
                    var rbevent = handlers.splice(i, 1);
                    rbevent.length = 0; // Clear array
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
