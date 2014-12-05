define([], function () {
    /**
     * Attaches CSS to an elements style attribute
     * @param {object} ele    A DOM Element in which to add the CSS to.
     * @param {object} css CSS in which to add to the Element in an object
     * @returns {object} ele  Passes the element with css attached to style attribute.
     *
     * @example
     *  var div = document.createElement('div'),
     * 		css = {
     * 			'position': 'relative',
     *    		'backgroundColor': 'black'
     *   	};
     *  attachCss(ele, css);
     *  // Returns x (<div style="position: relative; background-colour: black"></div>)
     */
    function attachCss (ele, css) {
        if (!css) {
            return ele;
        }

        var style = ele.style;

        for (var rule in css) {
            style[rule] = css[rule];
        }

        return ele;
    }

    return attachCss;
});
