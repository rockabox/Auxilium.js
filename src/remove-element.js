/**
 * A module which removes all child nodes and optionally, the main node.
 * @module aux/remove-element
 */
define([
], function () {
    /**
     * Removes an elements child node
     * @memberOf module:aux/remove-element
     * @param {Object} node HTML node to act upon
     * @param {Boolean:false} self Optional: remove the entire node
     * return {Object} Original HTML node
     */
    function removeElement (node, self) {
        var parent = node.parentNode;
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        if (self && parent) {
            parent.removeChild(node);
        }
        return parent;
    }

    return removeElement;
});
