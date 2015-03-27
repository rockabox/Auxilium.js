define([
    'aux/is-defined'
], function (isDefined) {

    describe('Will check whether or not a variable', function () {

        describe('is defined', function () {
            it('should return that a variable is defined when a Function', function () {
                var check = function () {};

                expect(isDefined(check)).toBeTruthy();
            });

            it('should return that a variable is defined when an Object', function () {
                expect(isDefined({})).toBeTruthy();
            });

            it('should return that a variable is defined when an Array', function () {
                expect(isDefined([])).toBeTruthy();
            });

            it('should return that a variable is defined when a String', function () {
                expect(isDefined('')).toBeTruthy();
            });

            it('should return that a variable is defined when a Number', function () {
                expect(isDefined(1)).toBeTruthy();
            });

            it('should return that the variable is not defined', function () {
                var check;

                expect(isDefined(check)).toBeFalsy();
            });
        });

        describe('is a specific type', function () {
            it('should return true if a function', function () {
                var check = function () {};

                expect(isDefined(check, 'function')).toBeTruthy();
            });

            it('should return true if an object', function () {
                expect(isDefined({}, 'object')).toBeTruthy();
            });

            it('should return true if an array', function () {
                expect(isDefined([], 'array')).toBeTruthy();
            });

            it('should return true if a string', function () {
                expect(isDefined('', 'string')).toBeTruthy();
            });

            it('should return true if a number', function () {
                expect(isDefined(1, 'number')).toBeTruthy();
            });
        });

        describe('is undefined or does not match type', function () {
            it('should return that a number is not a function', function () {
                expect(isDefined(1, 'function')).toBeFalsy();
            });

            it('should return that an array is not an object', function () {
                expect(isDefined([], 'object')).toBeFalsy();
            });

            it('should return that an object is not an array', function () {
                expect(isDefined({}, 'array')).toBeFalsy();
            });

            it('should return that an undefined variable is not an object', function () {
                var check;

                expect(isDefined(check, 'object')).toBeFalsy();
            });
        });
    });

});
