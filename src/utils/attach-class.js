define(['utils/has-class'], function (hasClass) {
    /**
     * Add class to an element.
     * @param {object} ele Element to add class to
     * @param {string} name Class name
     * @returns {object} Element with added class
     */
    function addClass (ele, name) {
        if (!hasClass(ele, name)) {
            ele.className += (ele.className ? ' ' : '') + name;
        }
        return ele;
    }

    return addClass;
});
