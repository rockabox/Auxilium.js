define([
    'utils/attach-attr',
    'utils/attach-class',
    'utils/attach-css',
    'utils/attach-events'
], function (attachAttr, attachClass, attachCss, attachEvents) {
    /**
     * Creates an element and returns the element
     * @param {string} tag              The HTML tag type in which to create
     * @param {object} params           Contains paramaters to be used for the creation of the element
     * @param {object} params.attr      Contains the HTML node attributes and it's values to be added to the element
     * @param {object} params.css       Contains the css styling to be added to the element
     * @param {object} params.events    Contains event handlers to be attached to an element
     * @param {string} params.className Contains a class name in which to attach to an element
     *
     * @returns ele The HTML element created with css and attributes added to passed from params
     */
    function createElement (tag, params) {
        var attr,
            css,
            ele = document.createElement(tag);

        if (typeof params === 'undefined') {
            return ele;
        }

        attachEvents(ele, params.events);
        attachAttr(ele, params.attr);
        attachCss(ele, params.css);
        attachClass(ele, params.className);

        return ele;
    }

    return createElement;
});
