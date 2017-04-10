define([
    'aux/throttle'
], function (throttle) {
    describe('Throttle', function () {
        var action,
            throt;

        beforeEach(function () {
            action = jasmine.createSpy('throttle');
            throttled = throttle(action, 10);
        });

        it('should fire the function provided to the throttle', function () {
            throttled();

            expect(action).toHaveBeenCalled();
            expect(action.calls.count()).toBe(1);
        });

        it('should fire first call and the last call', function (done) {
            throttled();

            setTimeout(function () {
                throttled();
                expect(action.calls.count()).toBe(1);
            }, 5);

            setTimeout(function () {
                expect(action.calls.count()).toBe(2);
                done();
            }, 30);
        });

        it('should only fire one action of subsequence calls during the throttle period', function (done) {
            throttled();

            expect(action.calls.count()).toBe(1);
            setTimeout(function () {
                throttled();
                throttled();
                throttled();
            }, 5);
            expect(action.calls.count()).toBe(1);

            setTimeout(function () {
                expect(action.calls.count()).toBe(2);
                done();
            }, 30);
        });

        it('should use a default `wait` of `0`', function (done) {
            var noWait = throttle(action);

            noWait();
            expect(action.calls.count()).toBe(1);

            setTimeout(function () {
                noWait();
                expect(action.calls.count()).toBe(2);
                done();
            }, 5);
        });
    });
});
