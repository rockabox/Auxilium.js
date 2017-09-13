define([
    'aux/ends-with'
], function (endsWith) {
    describe('String ends with', function () {
        var url;

        beforeEach(function () {
            url = 'debug.scoota.com';
        });

        it('should return true when the string does end with a particular string', function () {
            expect(endsWith(url, 'scoota.com')).toBeTruthy();
        });

        it('should return `false` when string does not end exact', function () {
            expect(endsWith(url, 'scoota.co')).toBeFalsy();
        });

        it('should return `false` if no suffix passed', function () {
            expect(endsWith(url)).toBeFalsy();
        });

        it('should return `false` if no string passed', function () {
            var str;

            expect(endsWith(str, 'scoota.com')).toBeFalsy();
        });
    });
});
