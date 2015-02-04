/**
 * A module which Creates an element and returns the element.
 * @module utils/create-element
 * @requires module:utils/attach-attr
 * @requires module:utils/attach-class
 * @requires module:utils/attach-css
 * @requires module:utils/attach-events
 */
define([
    'utils/attach-attr',
    'utils/attach-class',
    'utils/attach-css',
    'utils/attach-events'
], function (attachAttr, attachClass, attachCss, attachEvents) {
    /**
     * Creates an element and returns the element
     * @memberOf module:utils/create-element
     *
     * @param {string} tag                      The HTML tag type in which to create
     * @param {object} params                   Contains paramaters to be used for the creation of the element
     * @param {object} params.attr              Contains the HTML node attributes and it's values to be added to the
     *                                          element (should not pass class through here use cssNames).
     * @param {object} params.css               Contains the css styling to be added to the element
     * @param {string|array} params.cssNames    Contains css class name or names in which to attach to an element
     * @param {object} params.events            Contains event handlers to be attached to an element
     *
     * @returns ele The HTML element created with css and attributes added to passed from params
     *
     * @requires attachEvents
     * @requires attachAttr
     * @requires attachCss
     * @requires attachClass
     *
     * @example
     * var params = {
     * 		attr: {
     * 			src: 'http://rockabox.com/example.gif'
     * 		},
     * 		events: {
     * 			load: function () {
     * 				console.log('Fire me when the image is loaded');
     * 			}
     * 		},
     * 		css: {
     * 			border: '1px solid black',
     * 			backgroundColor: 'red'
     * 		},
     * 		cssNames: ['legen', 'wait-for-it', 'dary']
     * };
     * var imageEle = createElement('img', params);
     * // Returns
     * // &lt;img src="http://rockabox.com/example.gif" style="border: 1px solid black; background-color: red;"
     * //   class="legen wait-for-it dary" /&gt;
     * // When the image source has loaded a function will be ran console logging out.
     *
     */
    function createElement (tag, params) {
        var ele = document.createElement(tag);

        if (typeof params === 'undefined') {
            return ele;
        }

        attachEvents(ele, params.events);
        attachAttr(ele, params.attr);
        attachCss(ele, params.css);
        attachClass(ele, params.cssNames);

        return ele;
    }

    return createElement;
});
