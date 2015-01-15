define([

], function () {

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
