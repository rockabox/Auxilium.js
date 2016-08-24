define([
    'aux/create-element',
    'aux/prepend'
], function (createElement, prepend) {
    describe('Check if the node element is added to the parent', function () {
        var ele,
            childEle,
            params;

        beforeEach(function () {

            childEle = createElement('div');
            params = {
                attr: {
                    'id': 'div-main'
                },
                css: {
                    border: '1px solid black',
                    backgroundColor: 'red'
                },
                cssNames: ['legen', 'wait-for-it', 'dary'],
                innerHTML: '<div class="futurama"><span class="bart"></span></div>',
                nodes: [
                    {
                        tag: 'div',
                        cssNames: 'family-guy',
                        nodes: {
                            tag: 'span',
                            cssNames: 'peter'
                        }
                    }
                ],
                children: [
                    childEle
                ]
            };
            ele = createElement('div', params);
        });

        it('should attach an element as the firstChild of the element passed', function () {
            var eleChild = createElement('div');

            prepend(ele, eleChild);

            expect(ele.firstChild).toBe(eleChild);
        });

        it ('should call insertBefore on the element passed to the function', function () {
            var eleNewChild = createElement('div'),
                firstChild = ele.firstChild;

            spyOn(ele, 'insertBefore');

            prepend(ele, eleNewChild);

            expect(ele.insertBefore).toHaveBeenCalledWith(eleNewChild, firstChild);
        });
    });
});
