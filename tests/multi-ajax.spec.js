define([
    'aux/multi-ajax',
    'jasmine-ajax'
], function (MultiAjax, jasmineAjax) {
    describe('Multi-ajax utils', function () {

        var multiAjax;

        beforeEach(function () {
            jasmine.Ajax.install();
            jasmine.Ajax.stubRequest('a.json').andReturn({'responseText': '{}'});
            jasmine.Ajax.stubRequest('b.json').andReturn({'responseText': '{}'});
            jasmine.Ajax.stubRequest('c.json').andReturn({'responseText': '{}'});
            jasmine.Ajax.stubRequest('error.json').andReturn({'responseText': 'Not a JSON'});
            jasmine.Ajax.stubRequest('404.json').andReturn({'status': 404});

            multiAjax = new MultiAjax();
        });

        afterEach(function () {
            jasmine.Ajax.uninstall();
        });

        it('should be able to initialise', function () {
            expect(multiAjax.loadJson).toBeDefined();
        });

        it('should load json', function () {
            spyOn(multiAjax._ajax, 'getRequest').and.callThrough();
            var result = multiAjax.loadJson(['a.json']);

            expect(result).not.toBeDefined();
            expect(multiAjax._ajax.getRequest).toHaveBeenCalled();
        });

        it('should request every json', function () {
            var success = false,
                error = false;
            spyOn(multiAjax, '_loadJsonCallbackGenerator').and.callThrough();
            multiAjax.loadJson(['a.json', 'b.json', 'c.json'], 'get', function (response) {
                expect(response).toEqual([{}, {}, {}]);
                success = true;
            }, function () {
                error = true;
            });

            expect(success).toBe(true);
            expect(error).toBe(false);
            expect(multiAjax['_loadJsonCallbackGenerator'].calls.count()).toBe(3);
        });

        it('should stop on first error', function () {
            var success = false,
                error = false;
            spyOn(multiAjax, '_loadJsonCallbackGenerator').and.callThrough();
            multiAjax.loadJson(['a.json', 'error.json', 'c.json'], 'get', function () {
                success = true;
            }, function (response) {
                expect(response.toString().substring(0, 13)).toEqual('SyntaxError: ');
                error = true;
            });

            expect(success).toBe(false);
            expect(error).toBe(true);
            expect(multiAjax._loadJsonCallbackGenerator.calls.count()).toBe(2);
        });

        it('should stop on first 404', function () {
            var success = false,
                error = false;
            spyOn(multiAjax, '_loadJsonCallbackGenerator').and.callThrough();
            multiAjax.loadJson(['a.json', '404.json', 'c.json'], 'get', function () {
                success = true;
            }, function () {
                error = true;
            });

            expect(success).toBe(false);
            expect(error).toBe(true);
            expect(multiAjax._loadJsonCallbackGenerator.calls.count()).toBe(2);
        });
    });
});
