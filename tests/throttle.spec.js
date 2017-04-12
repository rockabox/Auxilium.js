define([
    'aux/throttle'
], function (throttle) {
    describe('Throttle', function () {
        var action,
            throt;

        beforeEach(function () {
            action = jasmine.createSpy('throttle');
            throttled = throttle(action, 20);
        });

        it('should fire the function provided to the throttle', function () {
            throttled();

            expect(action).toHaveBeenCalled();
            expect(action.calls.count()).toBe(1);
        });

        it('should only fire first call if the throttle has been called only once', function (done) {
            throttled();

            expect(action).toHaveBeenCalled();
            expect(action.calls.count()).toBe(1);

            setTimeout(function () {
                expect(action.calls.count()).toBe(1);
                done();
            }, 25);
        });

        it('should fire first call and the last call after throttle time has expired', function (done) {
            throttled();

            setTimeout(function () {
                throttled();
                expect(action.calls.count()).toBe(1);
            }, 10);

            setTimeout(function () {
                expect(action.calls.count()).toBe(2);
                done();
            }, 25);
        });

        it('should only fire one action of subsequence calls during the throttle period', function (done) {
            throttled();

            expect(action.calls.count()).toBe(1);

            setTimeout(function () {
                throttled();
                throttled();
                throttled();
                expect(action.calls.count()).toBe(1);
            }, 10);

            setTimeout(function () {
                expect(action.calls.count()).toBe(2);
                done();
            }, 30);
        });

        it('should fire once after the initial "last" `wait` time has complete', function (done) {
            throttled();

            expect(action.calls.count()).toBe(1);

            setTimeout(function () {
                throttled();
                expect(action.calls.count()).toBe(1);
            }, 10);

            setTimeout(function () {
                expect(action.calls.count()).toBe(2);
                throttled();
                expect(action.calls.count()).toBe(2);
            }, 30);

            setTimeout(function () {
                expect(action.calls.count()).toBe(3);
                done();
            }, 50);
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
