define([
    'aux/create-element',
    'aux/get-elements-by-class',
    'aux/has-class',
    'aux/prepend'
], function (createElement, getElementsByClass, hasClass, prepend) {
    describe('Check if the node element is added to the parent', function () {
        var ele,
            doc,
            childEle,
            customDocument,
            params;

        beforeEach(function () {

            customDocument = {
                createElement: function () {
                    return true;
                }
            };
            doc = top.document;
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
            ele = createElement('div', params, doc);
        });

        it('Should check if the parentNode has the class', function () {
            var eleOne = getElementsByClass(ele, 'futurama');

            expect(eleOne.length).toBe(1);
            expect(hasClass(eleOne[0].parentNode, 'legen')).toBeTruthy();
        });

        it('Should call insertBefore and return the firstChild', function () {

            var eleOne = getElementsByClass(ele, 'futurama'),
                parent = eleOne[0].parentNode,
                eleChild = createElement('div');

            prepend(parent, eleChild);

            expect(parent.firstChild).toBe(eleChild);
        });
    });
});
