define([
    'attach-class',
    'create-element'
], function (attachClass, createElement) {
    describe('Attach a css class to a dom element util', function () {
        var ele,
            className;

        beforeEach(function () {
            ele = createElement('div');
        });

        it('should accept no class is passed', function () {
            attachClass(ele, className);

            expect(ele.className).not.toContain('undefined');
            expect(ele.className).toBe('');
        });

        it('should add a class when a string', function () {
            className = 'spunk-monkey';
            attachClass(ele, className);

            expect(ele.className).toContain('spunk-monkey');
        });

        it('should attach multiple classes when an array to the element', function () {
            className = ['legend', 'dairy', 'coke', 'milk'];

            attachClass(ele, className);

            expect(ele.className).toContain('legend');
            expect(ele.className).toContain('dairy');
            expect(ele.className).toContain('coke');
            expect(ele.className).toContain('milk');
        });
    });
});
