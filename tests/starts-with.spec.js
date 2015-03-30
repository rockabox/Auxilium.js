define([
    'aux/starts-with'
], function (startsWith) {
    describe('Does a string start with', function () {
        var match = 'test-something',
            nonmatch = 'something-test';

        it('test', function () {
            expect(startsWith(match, 'test')).toBeTruthy();
            expect(startsWith(nonmatch, 'test')).toBeFalsy();
        });
    });
});
