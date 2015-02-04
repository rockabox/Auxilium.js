define([
    'utils/has-class'
], function (hasClass) {
    describe('Check whether or not an element has a class', function () {

        var ele;

        beforeEach(function () {
            ele = document.createElement('div');
        });

        it('Should assert that the element has a class', function () {
            ele.className = 'reddit';

            expect(hasClass(ele, 'reddit')).toBeTruthy();
        });

        it('Should assert that the element does not have class', function () {
            ele.className = 'cadburys amazing';

            expect(hasClass(ele, 'mars')).toBeFalsy();
        });

        it('Should assert that the element has class when many', function () {
            ele.className = 'cadburys mars reddit alien';

            expect(hasClass(ele, 'mars')).toBeTruthy();
        });
    });
});
