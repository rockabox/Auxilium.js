define([
    'aux/ajax'
], function (Ajax) {
    describe('Ajax utils', function () {

        var ajax;

        beforeEach(function () {
            ajax = new Ajax();
        });

        it('should be able to initialise', function () {
            expect(ajax.load).toBeDefined();
            expect(ajax.getRequest).toBeDefined();
        });

        it('should load', function () {
            spyOn(ajax, 'getRequest').and.callThrough();
            var xhr = ajax.load('some.json');

            expect(xhr).toBeDefined();
            expect(ajax.getRequest).toHaveBeenCalled();
        });

        it('should get the correct request object', function () {
            var request = ajax.getRequest();

            expect(request).toBeDefined();
            expect(request).not.toBe(false);
        });

        describe('headers', function () {
            var getRequestSpy;

            beforeEach(function () {
                getRequestSpy = jasmine.createSpyObj('ajax.getRequest', ['open', 'send', 'setRequestHeader']);
                spyOn(ajax, 'getRequest').and.returnValue(getRequestSpy);
            });

            it('should set headers', function () {
                ajax.load('', 'get', function () {}, function () {}, {
                    'x-api-key': '7a7a7a'
                });

                expect(getRequestSpy.setRequestHeader).toHaveBeenCalledWith('x-api-key', '7a7a7a');
            });

            it('should do nothing if headers not passed', function () {
                ajax.load('', 'get', function () {}, function () {});

                expect(getRequestSpy.setRequestHeader).not.toHaveBeenCalled();
            });
        });

    });
});
