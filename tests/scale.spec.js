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

            beforeEach(function () {
                handler = scale._scaleHandler(window, node, 300, 250);
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should set zoom style on node', function () {
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
