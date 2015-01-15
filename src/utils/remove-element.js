define([

], function () {

    function removeElement (node) {
        var parent = node.parentNode;
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }
        if (parent) {
            parent.removeChild(node);
        }
        return parent;
    }

    return removeElement;
});
