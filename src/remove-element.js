define([
], function () {
    /**
     * Removes an elements child node and optionally the node itself.
     *
     * @exports remove-element
     *
     * @param {Object} node HTML node to act upon
     * @param {Boolean} self Optional: Remove the entire node
     *
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
