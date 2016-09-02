define([
], function () {

    /**
     * Prepend a DOM element before another
     * @exports prepend
     *
     * @param  {Object}  parent  The DOM Element we will be inserting `node` after
     * @param  {Object}  node    The DOM Element we will be inserting after `parent`
     *
     * @example
     * ```js
     * ele = <div class="elmo"></div>
     * parent = <div class="sesamestreet"></div>
     * prepend(parent, ele)
     * ```
     *
     */
    function prepend (parent, node) {
        parent.insertBefore(node, parent.firstChild);
    }

    return prepend;
});
