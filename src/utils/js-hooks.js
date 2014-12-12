define([
    'utils/events'
], function (Events) {
    var events = new Events();
    /**
     * Rockabox JSHook class, it will setup custom hooks set in the Placement js
     * for Load, Init, View initial, Engagement and Click.
     *
     * @param {object} ele          The element in order to attach to the custom hooks
     * @param {object} customHooks  Custom hooks set within Placement js
     */
    function JSHooks (ele, customHooks) {
        var $this = this,
            hooks = [
                'load',
                'init',
                'viewInitial',
                'engagement',
                'click'
            ];

        /**
         * Initializes the js hooks
         */
        function init () {
            for (var hook in hooks) {
                var hookName = hooks[hook],
                    hookEvent = 'rb.' + hookName;

                events.addListener(ele, hookEvent, customHooks[hookName]);
            }
        }

        init();
    }

    return {
        init: JSHooks,
        events: events
    };
});
