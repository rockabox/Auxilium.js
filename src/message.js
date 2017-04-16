define([
    'aux/events'
], function (Events) {

    /**
     * Cross domain iframe messaging module.
     * @exports message
     *
     * @requires module:aux/events
     */
    function message () {
        var events = new Events();

        return {
            /**
             * Expose events module for testing
             * @protected
             */
            _events: events,
            /**
             * Post JSON object to a given window.
             *
             * @param {Object} window Another window
             * @param {Object} data Will pass this object to window
             * @property {String} data.event Event type associated with this message
             * @property {String} data.params Event type associated with this message
             * @param {String} domain Define what the domain must be for the event to be dispatched
             */
            post: function (window, data, domain) {
                domain = domain || '*';
                try {
                    var dataString = JSON.stringify(data);
                    window.postMessage(dataString, domain);
                } catch (error) {
                    throw error;
                }
            },
            /**
             * Receive JSON object from a given window.
             *
             * @param {Object} window Another window
             * @param {Function} callback Function to pass data to
             */
            receive: function (window, callback) {
                this._events.addListener(window, 'message', function (event, messageEvent) {
                    try {
                        var data = JSON.parse(messageEvent.data);
                        callback(messageEvent, data);
                    } catch (error) {
                        throw error;
                    }
                });
            }
        };
    }

    return message();
});
