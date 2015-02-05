define([
    'remove-class'
], function (removeClass) {
    describe('Remove a class from an element', function () {
        var ele;

        beforeEach(function () {
            ele = document.createElement('div');
        });

        it('Should remove a class from a element', function () {
            ele.className = 'da-vinci';

            expect(ele.className).toContain('da-vinci');

            removeClass(ele, 'da-vinci');

            expect(ele.className).toBe('');
        });

        it('Should leave classes when multiple', function () {
            ele.className = 'da-vinci hercules';

            expect(ele.className).toContain('hercules');

            removeClass(ele, 'hercules');

            expect(ele.className).toBe('da-vinci');
        });
    });
});
