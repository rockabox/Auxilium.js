define([
    'aux/prepend'
], function (prepend) {
    describe('Check if the node element is added to the parent', function () {
        var ele = document.createElement('div'),
            parent = document.createElement('div');

        it('Should call insertBefore and return the firstChild', function () {
            prepend(parent, ele);

            expect(parent.firstChild).toBe(ele);
        });
    });
});
