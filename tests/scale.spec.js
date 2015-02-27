define([
    'aux/scale'
], function (Scale) {
    describe('Scale module', function () {
        var node,
            scale;

        beforeEach(function () {
            scale = Scale();
            node = document.createElement('div');
        });

        it('should apply scroll and resize handlers to window', function () {
            spyOn(scale, '_scaleHandler').and.callThrough();

            scale.init(node, 300, 250);

            expect(scale._scaleHandler.calls.count()).toEqual(1);
            expect(window.onscroll).toBeDefined();
            expect(window.onresize).toBeDefined();
        });

        describe('scaleHandler', function () {
            var handler;

            beforeEach(function () {
                handler = scale._scaleHandler(node, 300, 250);
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should set zoom style on node', function () {
                handler();

                // Where empty string is the default zoom value
                expect(node.style.zoom).not.toBe('');
            });
        });
    });
});
