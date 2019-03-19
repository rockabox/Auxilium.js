define([
    'aux/attach-css'
], function (attachCss) {
    describe('utils attachCss', function () {
        var ele,
            css = {
                backgroundColor: 'black'
            };

        beforeEach(function () {
            ele = document.createElement('div');
        });

        it('should add a backgroundColor successfully', function () {
            attachCss(ele, css);

            expect(ele.style.backgroundColor).toEqual(css.backgroundColor);
        });

        it('should make the backgroundColour priority set as important', () => {
            attachCss(ele, css, true);

            expect(ele.style.getPropertyPriority('background-color')).toBe('important');
        });

        it('should alaways set the display property as important', () => {
            attachCss(ele, {
                'display': 'block'
            });

            expect(ele.style.getPropertyPriority('display')).toBe('important');
        });

        it('should NOT make the backgroundColour priority set as important as passed false', () => {
            attachCss(ele, css, false);

            expect(ele.style.getPropertyPriority('background-color')).toBe('');
        });
    });
});
