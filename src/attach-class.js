/**
 * A module which attaches a css class to an html element.
 * @module utils/attach-class
 * @requires module:utils/has-class
 */
define([
    'utils/has-class'
], function (hasClass) {
    /**
     * Attaches a class to a name
     * @memberOf module:utils/attach-class
     *
     * @param {Object} ele  An element in which to attach a class
     * @param {string} name A class name which to attach to an element
     *
     * @returns ele The element passed with the class attached
     */
    function attachToEle (ele, name) {
        if (!hasClass(ele, name)) {
            ele.className += (ele.className ? ' ' : '') + name;
        }

        return ele;
    }

    /**
     * Add CSS Classes to an element if there is an array passed or a singular class name if a string
     * @memberOf module:utils/attach-class
     *
     * @param {object}          ele     Element in which to add the class/classes.
     * @param {string|array}    names   The class name or names in which to add.
     *
     * @returns {object}        Element with added class or classes
     *
     * @example
     * // Attach mulitple classes to an element
     * var ele = document.createElement('div'),
     * 		names = ['IP', 'Freely'];
     *
     * attachClass(ele, names);
     * // Returns ele
     * // (&lt;div class="IP Freely"&gt;&lt;/div&gt;)
     *
     * // Attach a single class to an element
     * var ele = document.createElement('div'),
     * 		names = 'barney-stinson';
     *
     * attachClass(ele, names);
     * // Returns ele
     * // (&lt;div class="barney-stinson"&lt;&gt;/div&gt;)
     */
    function attachClass (ele, names) {
        if (!names) {
            return ele;
        }

        if (typeof names === 'string') {
            attachToEle(ele, names);
        } else {
            for (var name in names) {
                if (names.hasOwnProperty(name)) {
                    attachToEle(ele, names[name]);
                }
            }
        }

        return ele;
    }

    return attachClass;
});
