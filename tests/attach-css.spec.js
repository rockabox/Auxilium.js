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
            attachCss(ele, css);

            expect(ele.style.getPropertyPriority('background-color')).toBe('important');
        });
    });
});
