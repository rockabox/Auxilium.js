define([
    'aux/error'
], function (error) {
    describe('Error handling util function', function () {
        it('should throw an error message', function () {
            var errorMessage = 'error';

            expect(function () {
                error(errorMessage);
            }).toThrow(errorMessage);
        });
    });
});
