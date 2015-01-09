/**
 * A module which attaches inline styling to an html element.
 * @module utils/attach-css
 */
define([], function () {
    /**
     * Attaches CSS to an elements style attribute
     * @memberOf module:utils/attach-css
     *
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
     *  // Returns div (&lt;div style="position: relative; background-colour: black"&gt;&lt;/div&gt;)
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
