define(['utils/has-class'], function (hasClass) {
    /**
     * Add CSS Classes to an element if there is an array passed or a singular class name if a string
     *
     * @param {object}          ele     Element in which to add the class/classes.
     * @param {string|array}    names   The class name or names in which to add.
     *
     * @returns {object}        Element with added class or classes
     */
    function attachClass (ele, names) {
        if (!names) {
            return ele;
        }

        function attachToEle (name) {
            if (!hasClass(ele, name)) {
                ele.className += (ele.className ? ' ' : '') + name;
            }
        }

        if (typeof names === 'string') {
            attachToEle(names);
        } else {
            for (var name in names) {
                if (names.hasOwnProperty(name)) {
                    attachToEle(names[name]);
                }
            }
        }

        return ele;
    }

    return attachClass;
});
