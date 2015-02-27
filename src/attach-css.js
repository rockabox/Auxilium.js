define([
], function () {
    /**
     * @exports attach-css
     *
     * @description
     * A module which attaches inline styling to an html element.
     *
     * @param {object} ele    A DOM Element in which to add the CSS to.
     * @param {object} css CSS in which to add to the Element in an object
     *
     * @returns {object} ele  Passes the element with css attached to style attribute.
     *
     * @example
     * ```js
     *  var div = document.createElement('div'),
     * 		css = {
     * 			'position': 'relative',
     *    		'backgroundColor': 'black'
     *   	};
     *  attachCss(ele, css);
     *  // Returns div (<div style="position: relative; background-colour: black"></div>)
     *  ```
     */
    function attachCss (ele, css) {
        if (!css) {
            return ele;
        }

        var style = ele.style;

        for (var rule in css) {
            if (css.hasOwnProperty(rule)) {
                style[rule] = css[rule];
            }
        }

        return ele;
    }

    return attachCss;
});
