define([
    'aux/validate-html'
], function (validateHTML) {
    describe('Validate HTML string', function () {
        it('should return that html is valid', function () {
            var html = '<div></div>';

            expect(validateHTML(html)).toBeTruthy();
        });

        it('should return that html is not valid', function () {
            var html = '<div></div';

            expect(validateHTML(html)).toBeFalsy();
        });

        it('should return that html with nested elements is valid', function () {
            var html = '<div id="someId"><span>some span</span><style>div { display: block; }</style>' +
                '<div><div>Very nested</div></div></div><div></div><script></script>';

            expect(validateHTML(html)).toBeTruthy();
        });

        it('should return that html with nested elements is not valid', function () {
            var html = '<div id="someId"><span>some span</span><style>div { display: block; }</style>' +
                '<div><div>Very nested</div</div></div><div></div><script></script>';

            expect(validateHTML(html)).toBeFalsy();
        });
    });
});
