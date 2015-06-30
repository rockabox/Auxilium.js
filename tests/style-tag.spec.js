define([
    'aux/style-tag'
], function (styleTag) {
    describe('Attach style', function () {
        var css = '.test-element{z-index:999;top:0;left:0;}';

        describe('generation of a tag', function () {
            var tag;

            beforeEach(function () {
                tag = styleTag.generate({
                    css: css,
                    document: document,
                    id: 'jeff-goldblum'
                });

                document.body.appendChild(tag);
            });

            afterEach(function () {
                document.body.removeChild(tag);
            });

            it('should generate a style tag', function () {
                expect(tag.tagName).toBeIgnoreCase('style');
            });

            it('should return an existing style tag with an id', function () {
                spyOn(document.body, 'appendChild');

                var params = {
                        css: '.some-other-css { body { display: none; }}',
                        document: document,
                        id: 'jeff-goldblum'
                    },
                    style = styleTag.generate(params);

                expect(style).toBe(tag);
                expect(styleTag.contents(style)).toBe(styleTag.contents(tag));
            });
        });

        it('should attach a style tag', function () {
            spyOn(styleTag, 'generate').and.callThrough();
            spyOn(document.body, 'appendChild');

            var params = {
                    css: css,
                    document: document
                },
                style = styleTag.attach(params);

            expect(styleTag.generate).toHaveBeenCalledWith(params);
            expect(document.body.appendChild).toHaveBeenCalledWith(style);
        });

        it('should retrieve css contents', function () {
            // IE9 returns the css with carriage returns and spaces
            var style = styleTag.generate({
                    css: css,
                    document: document
                }),
                contents = styleTag.contents(style);

            expect(contents).toContain('.test-element');
            expect(contents.toLowerCase()).toContain('z-index');
        });
    });
});
