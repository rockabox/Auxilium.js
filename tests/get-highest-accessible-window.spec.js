define([
    'aux/get-highest-accessible-window'
], function (getHighestAccessibleWindow) {
    describe('Get the highest accessible window', function () {
        var topWindow,
            win;

        beforeEach(function () {
            topWindow = {
                document: false
            };

            win = {
                top: topWindow,
                parent: {
                    top: topWindow,
                    document: false,
                    parent: {
                        top: topWindow,
                        document: {
                            domain: 'something'
                        },
                        parent: {
                            top: topWindow,
                            document: false,
                            parent: topWindow
                        }
                    }
                }
            };
        });

        it('should use the current window to check if window is not passed', function () {
            expect(getHighestAccessibleWindow()).toBe(window.top);
        });

        it('should traverse through the windows until we find access and stop at top', function () {
            expect(getHighestAccessibleWindow(win).document.domain).toBe('something');
        });

        it('should be able to continue traversing through to higher accessible after window found', function () {
            win.parent.parent.parent = {
                parent: {
                    top: topWindow,
                    document: {
                        domain: 'woops'
                    },
                    parent: topWindow
                }
            };

            expect(getHighestAccessibleWindow(win).document.domain).toBe('woops');
        });
    });
});
