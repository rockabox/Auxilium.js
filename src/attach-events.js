/**
 * A module which attaches events to an html element.
 * @module utils/attach-events
 * @requires module:utils/events
 */
define([
    'utils/events'
], function (Events) {
    /**
     * Attaches multiple events to an element using the Rockabox Events system
     * @memberOf module:utils/attach-events
     *
     * @param {Object} ele      The DOM Element in which to attach the events to.
     * @param {Object} handlers An object containing all of the different event types in which to attach a function to.
     *
     * @returns ele
     *
     * @example
     * var div = document.createElement('div'),
     * 		handlers = {
     * 			click: function () {
     * 				console.log('Fire me when theres a click on the element');
     * 			},
     * 			load: function () {
     * 				console.log('Fire me when the element has loaded');
     * 			}
     * 		};
     *
     * // Returns div
     * // clicking on the div will result in a console.log and the function within handlers.click to fire.
     */
    function attachEvents (ele, handlers) {
        if (!handlers) {
            return ele;
        }

        var events = new Events();
        for (var eventHandler in handlers) {
            if (handlers.hasOwnProperty(eventHandler)) {
                events.addListener(ele, eventHandler, handlers[eventHandler]);
            }
        }

        return ele;
    }

    return attachEvents;
});
