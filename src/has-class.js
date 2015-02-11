define([
], function () {
    /**
     * Checks whether or not an element has a specific class name.
     *
     * @exports has-class
     *
     * @param  {object}  ele  Element to test.
     * @param  {string}  name Class name you want to see if the element contains.
     *
     * @return {boolean}      Whether or not the element has the class name.
     *
     * @example
     * ```js
     * ele = <div class="kermit gonzo"></div>
     * hasClass(div, 'gonzo');
     * // Returns true
     *
     * ele = <div class="cookiemonster"></div>
     * hasClass(div, 'kermit');
     * // Returns false
     * ```
     */
    function hasClass (ele, name) {
        var exp = new RegExp('(\\s|^)' + name + '(\\s|$)');
        return exp.test(ele.className);
    }

    return hasClass;
});
