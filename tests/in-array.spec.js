define([
    'aux/in-array'
], function (inArray) {

    describe('Checks whether or not an array contains a particular value', function () {
        var arr;

        beforeEach(function () {
            arr = [0, 10, 20];
        });

        it('should specify that it does contain the value', function () {
            expect(inArray(arr, 10)).toBeTruthy();
        });

        it('should specify that the value is not within the array', function () {
            expect(inArray(arr, 11)).toBeFalsy();
        });
    });
});
