define([
    'aux/create-element',
    'aux/offset'
], function (createElement, offset) {
    describe('Get the offset top and left of an element compared to the window', function () {
        var ele,
            eleOffset;

        it('should return the current offset of an element which has no offsets set', function () {
            ele = document.createElement('div');
            eleOffset = offset(ele);

            expect(eleOffset.x).toBe(0);
            expect(eleOffset.y).toBe(0);
        });

        it('should return the offset when nested', function () {
            ele = {
                offsetTop: 10,
                offsetLeft: 9,
                offsetParent: {
                    offsetTop: 5,
                    offsetLeft: 1
                },
                ownerDocument: {
                    defaultView: {
                        getComputedStyle: function () {
                            return {
                                getPropertyValue: function () {
                                    return 'absolute';
                                }
                            };
                        }
                    }
                }
            };

            eleOffset = offset(ele);

            expect(eleOffset.x).toBe(10);
            expect(eleOffset.y).toBe(15);
        });

        describe('position fixed', function () {
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

                eleOffset = offset(mainEle);

                expect(eleOffset.fixed).toBeTruthy();
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

                eleOffset = offset(ele);

                expect(eleOffset.fixed).toBeFalsy();
            });
        });

        describe('attached to DOM', function () {
            afterEach(function () {
                document.body.removeChild(ele);
            });

            it('should continually return offset of parents', function () {
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
                        'position': 'fixed',
                        'top': '0',
                        'left': '0'
                    },
                    nodes: [
                        {
                            tag: 'div',
                            css: {
                                'margin-left': '10px',
                                'margin-top': '5px',
                                'position': 'relative',
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

                eleOffset = offset(mainEle);

                expect(eleOffset.x).toBe(25);
                expect(eleOffset.y).toBe(20);
            });

            it('should take in to consideration minus margins', function () {
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
                        'position': 'fixed',
                        'top': '0',
                        'left': '0'
                    },
                    nodes: [
                        {
                            tag: 'div',
                            css: {
                                'margin-left': '10px',
                                'margin-top': '-15px',
                                'position': 'relative',
                                'top': '5px'
                            },
                            children: [
                                mainEle
                            ]
                        }
                    ]
                });

                // It's not possible to get the offsets correctly if the element is not appeneded to the DOM
                document.body.appendChild(ele);

                eleOffset = offset(mainEle);

                expect(eleOffset.x).toBe(20);
                expect(eleOffset.y).toBe(-5);
            });
        });
    });
});
