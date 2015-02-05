define(['ajax'], function (Ajax) {
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
    });
});
