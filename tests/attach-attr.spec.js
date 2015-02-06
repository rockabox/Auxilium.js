define([
    'aux/attach-attr'
], function (attachAttr) {
    describe('utils attachAttr', function () {

        var ele,
            attrs = {
                test: 'works'
            };

        beforeEach(function () {
            ele = document.createElement('div');
        });

        it('should add an attribute successfully', function () {
            attachAttr(ele, attrs);

            expect(ele.getAttribute('test')).toEqual(attrs.test);
        });
    });
});
