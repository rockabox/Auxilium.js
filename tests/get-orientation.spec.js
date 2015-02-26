define([
    'aux/get-orientation'
], function (getOrientation) {
    describe('Getting the human redable orienation', function () {
        it('should return portrait when screen has not flipped', function () {
            expect(getOrientation(0)).toBe('portrait');
        });

        it('should return portrait when screen has been flipped upside down', function () {
            expect(getOrientation(180)).toBe('portrait');
        });

        it('should return landscape when the screen has been flipped left', function () {
            expect(getOrientation(90)).toBe('landscape');
        });

        it('should return landscape when the screen has been flipped right', function () {
            expect(getOrientation(-90)).toBe('landscape');
        });

        it('should default to portrait when orientation not available', function () {
            expect(getOrientation()).toBe('portrait');
        });

        it('should fallback to window scope when no orientation passed', function () {
            // This test may fail when run on devices specifying orienation so check we're on a device
            // prior to running.
            if (typeof window.orientation === 'undefined') {
                expect(getOrientation()).toBe('portrait');
            }
        });
    });
});
