define([
], function () {
    /**
     * A loader for Javascript files on the page using a script tag.
     * @exports load-script
     */
    function LoadScript () {

        var script,
            head,
            onLoadHandler,
            $this = this,
            done = false;

        /**
         * Adds load and error listeners on to the script tag.
         *
         * @memberOf module:load-script
         *
         * @param {Function} onload  A callback function which should be called when the file has loaded.
         * @param {Function} onerror A callback fired when an error occurs loading the file.
         *
         * @return {Object} Script DOM node.
         */
        this.addListeners = function (onload, onerror) {
            onLoadHandler = onload;
            script.onload = script.onreadystatechange = $this.onload;

            if (typeof script.onerror !== 'undefined') {
                script.onerror = onerror;
            }

            return script;
        };

        /**
         * Set's up the constructor calling the getScript method.
         * @memberOf module:load-script
         *
         * @return {Object} script The script DOM node.
         */
        this.init = function () {
            script = this.getScript();

            return script;
        };

        /**
         * Load's the file via the script tag on to the page.
         * @memberOf module:load-script
         *
         * @param  {String} src The URL to the file in which to load.
         * @return {Object} script The script DOM node.
         */
        this.load = function (src) {
            script.src = src;
            this.render();

            return script;
        };

        this.onload = function (event) {
            var s = (event && event.target) ? event.target : script,
                state = s.readyState,
                ready = (!state) || (state === 'loaded') ||
                    (state === 'complete');

            if (!done && ready) {
                if (onLoadHandler) {
                    onLoadHandler(event);
                }
                done = true;
                s.onload = s.onreadystatechange = null;
            }
        };

        /**
         * Renders the script node to the page via a script tag.
         * @memberOf module:load-script
         *
         * @return {Object} script The script DOM node.
         */
        this.render = function () {
            head = document.getElementsByTagName('head')[0];
            (document.body || head).appendChild(script);

            return script;
        };

        /**
         * Creates a DOM element for the script tag.
         * @memberOf module:load-script
         *
         * @return {Object} s The script DOM node.
         */
        this.getScript = function () {
            var s = document.createElement('script');
            s.type = 'text/javascript';

            return s;
        };

        this.init();
    }

    return LoadScript;
});
