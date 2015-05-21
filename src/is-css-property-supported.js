define([
], function () {

    /**
     * Checks whether one or more properties are supported within the current browser
     * @param {String} properties The CSS property (or properties seperated by spaces) in which to test
     * @returns {Boolean} Whether one of the properties is supported within the browser
     */
    function isCssPropertySupported (properties) {
        var cssProp = properties.split(' '),
            supported = false;

        for (var i = 0; i < cssProp.length; i++) {
            // Check if the css property is attached to the style of the document body as an attribute
            if (cssProp[i] in document.body.style) {
                supported = true;
                // We only want to ensure one is checked
                break;
            }
        }

        return supported;
    }

    return isCssPropertySupported;
});
