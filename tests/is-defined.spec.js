define([
    'aux/is-defined'
], function (isDefined) {

    describe('Will check whether or not a variable is defined', function () {

        it('should return that the variable is not defined', function () {
            var check;
            expect(isDefined(check)).toBeFalsy();
        });

        it('should return that a variable is defined when an Object', function () {
            var check = {};

            expect(isDefined(check)).toBeTruthy();
        });

        it('should return that a variable is defined when an Array', function () {
            var check = [];

            expect(isDefined(check)).toBeTruthy();
        });

        it('should return that a variable is defined when a Number', function () {
            var check = 1;

            expect(isDefined(check)).toBeTruthy();
        });

        it('should return that a variable is defined when a Function', function () {
            var check = function () {
                };

            expect(isDefined(check)).toBeTruthy();
        });

        describe('as a specific type', function () {
            it('should return that a function is a defined as a function', function () {
                var check = function () {
                    };

                expect(isDefined(check, 'function')).toBeTruthy();
            });

            it('should return that a number is not a defined as a function', function () {
                var check = 1;

                expect(isDefined(check, 'function')).toBeFalsy();
            });

            it('should return that a number is defined as a number', function () {
                var check = 1;

                expect(isDefined(check, 'number')).toBeTruthy();
            });

            it('should return that an array is not a number', function () {
                var check = [];

                expect(isDefined(check, 'number')).toBeFalsy();
            });
        });

    });

});
