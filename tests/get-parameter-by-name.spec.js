define([
    'aux/get-parameter-by-name'
], function (getParameterByName) {
    describe('getParameterByName', function () {
        var url;

        beforeEach(function () {
            url = 'http://www.rockabox.com?param1=value1&param2=value2#somehashnotomitted';
        });

        it('should return the query paramater\'s value', function () {
            expect(getParameterByName(url, 'param1')).toBe('value1');
            expect(getParameterByName(url, 'param2')).toBe('value2');
        });

        it ('should return an empty string when query param doesn\'t exist', function () {
            expect(getParameterByName(url, 'param3')).toBe('');
        });
    });
});
