define([
    'aux/get-animation-frame'
], function (getAnimationFrame) {
    describe('Get Frame Animation Methods', () => {
        var animationFrame,
            win,
            requestMock,
            cancelMock;

        beforeEach(() => {
            win = {};

            requestMock = () => {};
            cancelMock = () => {};
        });

        it('should use the current window if none passed', () => {
            animationFrame = getAnimationFrame();

            expect(animationFrame.request).toBe('requestAnimationFrame');
            expect(animationFrame.cancel).toBe('cancelAnimationFrame');
        });

        describe('no vendor prefix', () => {
            beforeEach(() => {
                win.requestAnimationFrame = requestMock;
                win.cancelAnimationFrame = cancelMock;
            });

            it('should return request method with no prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('requestAnimationFrame');
            });

            it('should return cancel method with no prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('cancelAnimationFrame');
            });
        });

        describe('-webkit- prefix', () => {
            beforeEach(() => {
                win.webkitRequestAnimationFrame = requestMock;
                win.webkitCancelAnimationFrame = cancelMock;
            });

            it('should return request method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('webkitRequestAnimationFrame');
            });

            it('should return cancel method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('webkitCancelAnimationFrame');
            });
        });

        describe('-moz- prefix', () => {
            beforeEach(() => {
                win.mozRequestAnimationFrame = requestMock;
                win.mozCancelAnimationFrame = cancelMock;
            });

            it('should return request method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('mozRequestAnimationFrame');
            });

            it('should return cancel method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('mozCancelAnimationFrame');
            });
        });

        describe('-o- prefix', () => {
            beforeEach(() => {
                win.oRequestAnimationFrame = requestMock;
                win.oCancelAnimationFrame = cancelMock;
            });

            it('should return request method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('oRequestAnimationFrame');
            });

            it('should return cancel method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('oCancelAnimationFrame');
            });
        });

        describe('-ms- prefix', () => {
            beforeEach(() => {
                win.msRequestAnimationFrame = requestMock;
                win.msCancelAnimationFrame = cancelMock;
            });

            it('should return request method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('msRequestAnimationFrame');
            });

            it('should return cancel method with prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('msCancelAnimationFrame');
            });
        });

        describe('non prefix and prefix', () => {
            var prefixRequestMock,
                prefixCancelMock;

            beforeEach(() => {
                prefixRequestMock = () => {};
                prefixCancelMock = () => {};

                // Assign the non prefix functions
                win.requestAnimationFrame = requestMock;
                win.cancelAnimationFrame = cancelMock;

                // Assignt the prefix functions
                win.webkitRequestAnimationFrame = prefixRequestMock;
                win.webkitCancelAnimationFrame = prefixCancelMock;
            });

            it('should assign request as the non-prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.request).toBe('requestAnimationFrame');
            });

            it('should assign request as the non-prefix', () => {
                animationFrame = getAnimationFrame(win);

                expect(animationFrame.cancel).toBe('cancelAnimationFrame');
            });
        });
    });
});
