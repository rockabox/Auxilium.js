define([], function () {
    /**
     * Checks whether or not an element has a specific class name.
     *
     * @param  {object}  ele  Element to test.
     * @param  {string}  name Class name you want to see if the element contains.
     *
     * @return {boolean}      Whether or not the element has the class name.
     *
     * @example
     * var div = document.createElement('div');
     * div.className = 'kermit gonzo';
     * hasClass(div, 'gonzo');
     * // Returns true
     *
     * var div = document.createElement('div');
     * div.className = 'cookiemonster';
     * hasClass(div, 'kermit');
     * // Returns false
     */
    function hasClass (ele, name) {
        var exp = new RegExp('(\\s|^)' + name + '(\\s|$)');
        return exp.test(ele.className);
    }

    return hasClass;
});
