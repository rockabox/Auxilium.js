define([
    'aux/create-element',
    'aux/get-elements-by-class',
    'aux/has-class'
], function (createElement, getElementsByClass, hasClass) {
    describe('Creating a DOM element', function () {

        it('should create an element with no styling or attributes', function () {
            var ele = createElement('div');
            expect(ele.tagName).toBeIgnoreCase('div');
        });

        it('should create an element as part of a specific document', function () {
            var customDocument = {
                    createElement: function () {
                        return true;
                    }
                },
                ele;

            spyOn(customDocument, 'createElement');

            ele = createElement('div', {}, customDocument);

            expect(customDocument.createElement).toHaveBeenCalled();
        });

        it('should attach inline styling if passed through params', function () {
            var params = {
                    css: {
                        'display': 'none'
                    }
                },
                ele = createElement('div', params);

            expect(ele.style.display).toBeIgnoreCase('none');
        });

        it('should attach attributes if passed through params', function () {
            var params = {
                    attr: {
                        name: 'nick-is-awesome'
                    }
                },
                ele = createElement('div', params);

            expect(ele.getAttribute('name')).toBe('nick-is-awesome');
        });

        it('should attach an event handler if passed through params', function () {
            var counter = 0,
                params = {
                    events: {
                        click: function () {
                            counter++;
                        }
                    }
                },
                ele = createElement('img', params);

            ele.onclick();

            expect(counter).toBe(1);
        });

        describe('Creating elements with child elements', function () {
            var params,
                ele;

            beforeEach(function () {
                params = {
                    nodes: [
                        {
                            tag: 'div',
                            cssNames: 'child-one',
                            nodes: [
                                {
                                    tag: 'span',
                                    cssNames: 'child-two'
                                }
                            ]
                        }
                    ]
                };

                ele = createElement('div', params);
            });

            it('should create child elements', function () {
                expect(getElementsByClass(ele, 'child-one').length).toBe(1);
            });

            it('should recurssively create elements (a childs children)', function () {
                var eleTwo = getElementsByClass(ele, 'child-two');

                expect(eleTwo.length).toBe(1);
                expect(hasClass(eleTwo[0].parentNode, 'child-one')).toBeTruthy();
            });
        });

        it('should add text as inner HTML', function () {
            var params = {
                    innerHTML: '<div class="something"><span class="something"></span></div>'
                },
                ele = createElement('div', params);

            expect(getElementsByClass(ele, 'something').length).toBe(2);
        });

        it('should add pre-created elements as children when creating the element', function () {
            var childEle = createElement('div', {
                    cssNames: 'jazz'
                }),
                params = {
                    children: [childEle]
                },
                ele = createElement('div', params),
                getEle = getElementsByClass(ele, 'jazz');

            expect(getEle.length).toBe(1);
            expect(getEle[0]).toBe(childEle);
        });
    });
});
