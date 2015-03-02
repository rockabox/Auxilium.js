define([
    'aux/style-tag'
], function (styleTag) {
    describe('Attach style', function () {
        var css = '.test-element{z-index:999;top:0;left:0;}';

        it('should generate a style tag', function () {
            var tag = styleTag.generate(css, document);

            expect(tag.tagName).toBeIgnoreCase('style');
        });

        it('should attach a style tag', function () {
            spyOn(styleTag, 'generate').and.callThrough();
            spyOn(document.body, 'appendChild');

            var style = styleTag.attach(css, document);

            expect(styleTag.generate).toHaveBeenCalledWith(css, document);
            expect(document.body.appendChild).toHaveBeenCalledWith(style);
        });

        it('should retrieve css contents', function () {
            // IE9 returns the css with carriage returns and spaces
            var style = styleTag.attach(css, document),
                contents = styleTag.contents(style);

            expect(contents).toContain('.test-element');
            expect(contents).toContain('z-index');
        });
    });
});
