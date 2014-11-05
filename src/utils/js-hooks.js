/**
 * Rockabox JSHook class, it will setup custom hooks set in the Placement js
 * for Load, Init, View initial, Engagement and Click.
 *
 * @param {object} advert      The Advert class
 * @param {object} customHooks Custom hooks set within Placement js
 */
function JSHooks (advert, customHooks) {
    var $this = this,
        events = advert.utils.events,
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

            events.addListener(advert.getCreative(), hookEvent, customHooks[hookName]);
        }
    }

    init();
}
