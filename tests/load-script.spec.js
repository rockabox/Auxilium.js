define([
    'aux/load-script'
], function (LoadScript) {
    describe('LoadScript', function () {

        var cb = {
                onload: function () {},
                onerror: function () {}
            },
            loader,
            mockEvent = {
                target: {
                    readyState: 'loaded'
                }
            },
            src = '/base/test/formats/karma/helpers/script.js';

        beforeEach(function () {
            loader = new LoadScript();
        });

        it('should be functional', function () {
            expect(loader.addListeners).toBeDefined();
            expect(loader.init).toBeDefined();
            expect(loader.load).toBeDefined();
            expect(loader.render).toBeDefined();
            expect(loader.getScript).toBeDefined();
        });

        it('should be able to add load/error listeners', function () {
            var script = loader.addListeners(cb.onload, cb.onerror);

            expect(script.onload).toBeDefined();
            expect(script.onerror).toBeDefined();
        });

        it('should be able to initialise', function () {
            var script;

            spyOn(loader, 'getScript').and.callThrough();
            script = loader.init();

            expect(script.type).toEqual('text/javascript');
            expect(loader.getScript).toHaveBeenCalled();
        });

        it('should be able to load', function () {
            var script = loader.load(src);

            expect(script.src).toContain(src);
        });

        it('should call onload on success', function () {
            spyOn(cb, 'onload').and.callThrough();

            loader.addListeners(cb.onload, cb.onerror);
            loader.onload(mockEvent);

            expect(cb.onload).toHaveBeenCalled();
        });

        it('should be able to render', function () {
            var script = loader.init();

            script.id = 'script-test';
            loader.render();

            expect(document.getElementById('script-test')).toBeDefined();
        });

        it('should return script tag', function () {
            var script = loader.getScript();

            expect(script.type).toEqual('text/javascript');
        });
    });
});
