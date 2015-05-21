define([
    'aux/is-css-property-supported'
], function (isCssPropertySupported) {
    describe('Checking whether or not a browser supports a specific css property', function () {
        it('should specify that the browser supports the property width', function () {
            expect(isCssPropertySupported('width')).toBeTruthy();
        });

        it('should support multiple properties with one being valid', function () {
            expect(isCssPropertySupported('one two another height broken')).toBeTruthy();
        });

        it('should specify that the browser doesn\'t support a property', function () {
            expect(isCssPropertySupported('one random another')).toBeFalsy();
        });
    });
});
