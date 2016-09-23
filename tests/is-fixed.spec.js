define([
    'aux/create-element',
    'aux/is-fixed'
], function (createElement, isFixed) {
    describe('Get if the element is positioned within a fixed element', function () {
        var ele,
            fixed;

        describe('Attach DOM', function () {
            afterEach(function () {
                document.body.removeChild(ele);
            });

            it('should return fixed as true when a parent is set as fixed', function () {
                var mainEle = createElement('div', {
                    css: {
                        'margin-left': '0px',
                        'margin-top': '0px'
                    }
                });

                ele = createElement('div', {
                    css: {
                        'margin-left': '10px',
                        'margin-top': '5px',
                        'position': 'relative',
                        'top': '0',
                        'left': '0'
                    },
                    nodes: [
                        {
                            tag: 'div',
                            css: {
                                'margin-left': '10px',
                                'margin-top': '5px',
                                'position': 'fixed',
                                'top': '5px'
                            },
                            nodes: [
                                {
                                    tag: 'div',
                                    css: {
                                        'margin-left': '5px',
                                        'margin-top': '10px'
                                    },
                                    children: [
                                        mainEle
                                    ]
                                }
                            ]
                        }
                    ]
                });

                document.body.appendChild(ele);

                fixed = isFixed(mainEle);

                expect(fixed).toBeTruthy();
            });
        });

        it('should return that the ele is not nested within a fixed element', function () {
            ele = {
                offsetTop: 10,
                offsetLeft: 9,
                offsetParent: {
                    offsetTop: 5,
                    offsetLeft: 1
                },
                ownerDocument: {
                    defaultView: {
                        getComputedStyle: function (ele) {
                            return {
                                getPropertyValue: function () {
                                    return 'absolute';
                                }
                            };
                        }
                    }
                }
            };

            fixed = isFixed(ele);

            expect(fixed).toBeFalsy();
        });
    });
});
