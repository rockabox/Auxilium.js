define([
    'aux/scale',
    'aux/is-css-property-supported'
], function (Scale, isCssPropertySupported) {
    describe('Scale module', function () {
        var node,
            scale;

        beforeEach(function () {
            scale = Scale();
            node = document.createElement('div');
        });

        it('should apply scroll and resize handlers to window', function () {
            spyOn(scale, '_scaleHandler').and.callThrough();

            scale.init(window, node, 300, 250);

            expect(scale._scaleHandler.calls.count()).toEqual(1);
            expect(window.onscroll).toBeDefined();
            expect(window.onresize).toBeDefined();
        });

        describe('scaleHandler', function () {
            var handler;

            it('should return a function', function () {
                handler = scale._scaleHandler(window, node, 300, 250);
                expect(typeof handler).toBe('function');
            });

            it('should not set the size as larger than the original size', function () {
                var win = {
                    innerWidth: 600,
                    innerHeight: 500
                };

                handler = scale._scaleHandler(win, node, 300, 250);

                expect(handler()).toBe(1);
            });

            it('should exceed the width and height when fullscreen', function () {
                var win = {
                    innerWidth: 600,
                    innerHeight: 800
                };

                handler = scale._scaleHandler(win, node, 300, 400, true);

                expect(handler()).toBe(2);
            });

            it('should work out the ratio due to viewport width being less than the width', function () {
                var win = {
                    innerWidth: 150,
                    innerHeight: 500
                };

                handler = scale._scaleHandler(win, node, 300, 250);

                expect(handler()).toBe(0.5);
            });

            it('should work out the ratio due to viewport width being less than the height', function () {
                var win = {
                    innerWidth: 300,
                    innerHeight: 200
                };

                handler = scale._scaleHandler(win, node, 300, 400);

                expect(handler()).toBe(0.5);
            });

            it('should set scaling on node', function () {
                handler = scale._scaleHandler(window, node, 300, 250);
                handler();

                // Where empty string is the default zoom value
                if (isCssPropertySupported('transform -webkit-transform')) {
                    var style = node.style,
                        transform = (style.transform !== '') ? style.transform : style['-webkit-transform'];

                    expect(transform).toContain('scale(');
                } else {
                    expect(node.style.zoom).not.toBe('');
                }
            });
        });
    });
});
