define([
    'aux/is-trusted'
], function (isTrusted) {

    describe('Will check whether or not an event', function () {

        describe('is trusted', function () {
            it('should return that an event is trusted when isTrusted defined', function () {
                var event = {isTrusted: true};

                expect(isTrusted(event)).toBeTruthy();
            });

            it('should return that an event is trusted when valid clientX/clientY defined', function () {
                var event = {clientX: 10, clientY: 1};

                expect(isTrusted(event)).toBeTruthy();
            });
        });

        describe('is not trusted', function () {
            it('should return false if isTrusted set to false', function () {
                var event = {isTrusted: false};

                expect(isTrusted(event)).toBeFalsy();
            });

            it('should return false if clientX and clientY set to 0', function () {
                var event = {clientX: 0, clientY: 0};

                expect(isTrusted(event)).toBeFalsy();
            });

            it('should return false if missing clientX or clientY', function () {
                var eventNoX = {clientY: 10},
                    eventNoY = {clientX: 10};

                expect(isTrusted(eventNoX)).toBeFalsy();
                expect(isTrusted(eventNoY)).toBeFalsy();
            });

            it('should return false if the event is undefined', function () {
                expect(isTrusted()).toBeFalsy();
            });
        });
    });

});
