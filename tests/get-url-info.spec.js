define([
    'aux/get-url-info'
], function (getUrlInfo) {
    describe('Getting specific information from a URL', function () {
        var url;

        beforeEach(function () {
            url = 'https://www.some-example.com:912/my-page?a=foo&b=bar#somehash';
        });

        it('should return the hash', function () {
            expect(getUrlInfo(url).hash).toBe('#somehash');
        });

        it('should return the host', function () {
            expect(getUrlInfo(url).host).toBe('www.some-example.com:912');
        });

        it('should return the hostname', function () {
            expect(getUrlInfo(url).hostname).toBe('www.some-example.com');
        });

        it('should return the original href', function () {
            expect(getUrlInfo(url).href).toBe(url);
        });

        it('should return the port number', function () {
            expect(getUrlInfo(url).port).toBe('912');
        });

        it('should return the protocol', function () {
            expect(getUrlInfo(url).protocol).toBe('https:');
        });

        it('should return the search', function () {
            expect(getUrlInfo(url).search).toBe('?a=foo&b=bar');
        });
    });
});
