define([], function () {
    /**
     * Get all elements with a certain tag name within an element and fire a callback
     * @param {object}   ele      The containing object in which to search within
     * @param {[type]}   tag      The type of tag name in which should be looked for
     * @param {Function} callback A function in which to be fired being passed the element found
     *
     * @returns All of the elements found with the tag specified inside the ele
     */
    function getNestedEles (ele, tag, callback) {
        var elements = ele.getElementsByTagName(tag);

        for (var i = 0, len = elements.length; i < len; i++) {
            callback(elements[i]);
        }

        return elements;
    }

    return getNestedEles;
});
