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
     * @param {boolean} important Whether the css properties should be set as important
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
     *  // Returns div (<div style="position: relative; background-colour: black!important;"></div>)
     *  ```
     */
    function attachCss (ele, css, important) {
        if (!css) {
            return ele;
        }

        var style = ele.style;

        for (var rule in css) {
            if (css.hasOwnProperty(rule)) {
                if (typeof style.setProperty === 'function' && (important || rule === 'display')) {
                    style.setProperty(toSnakeCase(rule), css[rule], 'important');
                } else {
                    style[rule] = css[rule];
                }
            }
        }

        return ele;
    }

    function toSnakeCase (rule) {
        return rule.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    }

    return attachCss;
});
