beforeEach(function () {
    jasmine.addMatchers({
        /**
         * Checks whether a string contain's data (ignoring the case)
         *
         * @return {boolean} True if expected string is within the actual string
         */
        toBeIgnoreCase: function () {
            return {
                /**
                 * The compare function in order to run
                 *
                 * @param  {String} actual   The string data in which should be tested
                 * @param  {String} expected The string value expected to be the same as the actual variable
                 *
                 * @return {boolean} True if expected string equals the same actual string
                 */
                compare: function (actual, expected) {
                    return {
                        pass: actual.toLowerCase() === expected.toLowerCase()
                    };
                }
            };
        },
        /**
         * Checks whether a string contains's value (ignoring the case of the value).
         * @param {Object} util                  Jasmine's in built utilitiy functions
         * @param {Array}  customEqualityTesters Passed if there are any custom equality testers set via Jasmine
         */
        toContainIgnoreCase: function (util, customEqualityTesters) {
            customEqualityTesters = customEqualityTesters || [];

            return {
                /**
                 * The compare function in order to run
                 * @param  {String} actual   The string data in which should be tested
                 * @param  {String} expected The string value expected to be within the actual variable
                 * @return {boolean} True if expected string is within the actual string
                 */
                compare: function (actual, expected) {
                    return {
                        pass: util.contains(actual.toLowerCase(), expected.toLowerCase(), customEqualityTesters)
                    };
                }
            };
        }
    });
});
