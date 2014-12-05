define(['utils/events'], function (Events) {
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
