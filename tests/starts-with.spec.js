define([
    'aux/starts-with'
], function (startsWith) {
    describe('startsWith', function () {
        var match = 'test-something',
            nonmatch = 'something-test';

        it('should match', function () {
            expect(startsWith(match, 'test')).toBeTruthy();
        });

        it('should not match', function () {
            expect(startsWith(nonmatch, 'test')).toBeFalsy();
        });
    });
});
