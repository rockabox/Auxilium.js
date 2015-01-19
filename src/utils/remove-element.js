/**
 * A module which removes all child nodes and optionally, the main node.
 * @module utils/remove-element
 */
define([
], function () {
    /**
     * Removes an elements child node
     * @memberOf module:utils/remove-element
     * @param {Object} node HTML node to act upon
     * @param {Boolean:false} removeParent Optional: remove the entire node
     * return {Object} Original HTML node
     */
    function removeElement (node, removeParent) {
        var parent = node.parentNode;
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        if (removeParent && parent) {
            parent.removeChild(node);
        }
        return parent;
    }

    return removeElement;
});
