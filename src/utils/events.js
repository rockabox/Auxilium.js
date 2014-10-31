/**
 * @constructor
 * @param  {object} ele Element to register all events to.
 */
function Events (ele) {
    this.ele = ele;
}

/**
 * Registers event to an element with callback. If an event already
 * exists on the element, we add the function to our own event system.
 * @param {string} eventType Event name
 * @param {function} handler Function that will be called when this
 *                           event is triggered.
 */
Events.prototype.addListener = function (eventType, handler) {
    var $this = this,
        ele = $this.ele;

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
            $this.handleEvent(event);
        };
    }

    ele.rbevents[eventType].push(handler);
};

/**
 * Fires any registered events.
 * @private
 * @param  {object} event Event object
 * @param  {object} data  Data to pass with event
 */
Events.prototype.handleEvent = function (event, data) {
    var ele = this.ele,
        eventType = event.type;

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
 * @param  {string} eventType Event name
 * @param  {function} handler Function that was originally called when
 *                            this event is triggered.
 */
Events.prototype.removeEvent = function (eventType, handler) {
    var ele = this.ele;

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
 * @param  {string} eventType Event name
 * @param  {object} data    Data to pass with event
 */
Events.prototype.triggerEvent = function (eventType, data) {
    data = data || {};
    this.handleEvent({
        type: eventType
    }, data);
};
