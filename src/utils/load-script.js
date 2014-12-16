define([], function () {
    /**
     * A loader for Javascript <script/> tags
     */
    function LoadScript () {

        var script, head,
            onLoadHandler,
            $this = this,
            done = false;

        this.addListeners = function (onload, onerror) {
            onLoadHandler = onload;
            script.onload = script.onreadystatechange = $this.onload;
            if (script.onerror) {
                script.onerror = onerror;
            }

            return script;
        };

        this.init = function () {
            script = this.getScript();

            return script;
        };

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

        this.render = function () {
            head = document.getElementsByTagName('head')[0];
            (document.body || head).appendChild(script);

            return script;
        };

        this.getScript = function () {
            var s = document.createElement('script');
            s.type = 'text/javascript';

            return s;
        };

        this.init();
    }

    return LoadScript;
});
