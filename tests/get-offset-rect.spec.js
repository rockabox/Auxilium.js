define([
    'aux/create-element',
    'aux/get-offset-rect'
], function (createElement, getOffsetRect) {
    describe('Get the offset top and left of an element compared to the window', function () {
        var ele,
            eleOffset,
            win;

        beforeEach(function () {
            win = top.window;
        });

        it('should return the current offset of an element which has no offsets set', function () {
            ele = document.createElement('div');
            eleOffset = getOffsetRect(ele, win);

            expect(eleOffset.x).toBe(0);
            expect(eleOffset.y).toBe(0);
        });

        describe('attached to DOM', function () {
            afterEach(function () {
                document.body.removeChild(ele);
            });

            it('should return offset of nested elements', function () {
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

                eleOffset = getOffsetRect(mainEle, win);

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

                document.body.appendChild(ele);

                eleOffset = getOffsetRect(mainEle, win);

                expect(eleOffset.x).toBe(20);
                expect(eleOffset.y).toBe(-5);
            });

            describe('on scroll', function () {
                var mockWin;

                it('should add the scroll (pageYOffset and pageXOffset) to the offset', function () {
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

                    mockWin = {
                        'pageXOffset': 200,
                        'pageYOffset': 100,
                        'document': {
                            'clientTop': 0,
                            'clientLeft': 0
                        }
                    };

                    document.body.appendChild(ele);

                    eleOffset = getOffsetRect(mainEle, mockWin);

                    expect(eleOffset.x).toBe(225);
                    expect(eleOffset.y).toBe(120);
                });

                it('should add scroll and remove client Top and Left', function () {
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

                    mockWin = {
                        'pageXOffset': 200,
                        'pageYOffset': 100,
                        'document': {
                            'clientTop': 10,
                            'clientLeft': 50
                        }
                    };

                    document.body.appendChild(ele);

                    eleOffset = getOffsetRect(mainEle, mockWin);

                    expect(eleOffset.x).toBe(175);
                    expect(eleOffset.y).toBe(110);
                });

                it('should add scrollX and scrollY if not pageXOffset and pageYOffset', function () {
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

                    mockWin = {
                        'document': {
                            'scrollTop': 200,
                            'scrollLeft': 100,
                            'clientTop': 0,
                            'clientLeft': 0
                        }
                    };

                    document.body.appendChild(ele);

                    eleOffset = getOffsetRect(mainEle, mockWin);

                    expect(eleOffset.x).toBe(125);
                    expect(eleOffset.y).toBe(220);
                });
            });

            it('should return correct offset with nested spans', function () {
                var iframe = createElement('iframe', {
                    css: {
                        'width': '728px',
                        'height': '90px',
                        'border-top-width': '0px',
                        'border-right-width': '0px',
                        'border-bottom-width': '0px',
                        'border-left-width': '0px',
                        'position': 'relative'
                    }
                });

                ele = createElement('header', {
                    css: {
                        'padding': '0px',
                        'margin': '0px',
                        'display': 'block',
                        'position': 'relative'
                    },
                    nodes: [
                        {
                            tag: 'div',
                            attr: {
                                'id': 'block_ad_space'
                            },
                            css: {
                                'display': 'block',
                                'position': 'relative'
                            },
                            nodes: [
                                {
                                    tag: 'div',
                                    attr: {
                                        'id': 'large_ad'
                                    },
                                    css: {
                                        'margin-left': '120px',
                                        'display': 'block',
                                        'width': '970px'
                                    },
                                    nodes: [
                                        {
                                            tag: 'div',
                                            attr: {
                                                'id': 'leaderboard'
                                            },
                                            css: {
                                                'position': 'relative',
                                                'top': 'auto',
                                                'right': 'auto',
                                                'display': 'block',
                                                'width': '100%'
                                            },
                                            nodes: [
                                                {
                                                    tag: 'div',
                                                    attr: {
                                                        'id': 'ad-management'
                                                    },
                                                    css: {
                                                        'text-align': 'center',
                                                        'display': 'block',
                                                        'margin': '0 auto'
                                                    },
                                                    nodes: [
                                                        {
                                                            tag: 'div',
                                                            attr: {
                                                                'id': 'ad-code'
                                                            },
                                                            css: {
                                                                'display': 'block',
                                                                'margin': '0 auto'
                                                            },
                                                            nodes: [
                                                                {
                                                                    tag: 'span',
                                                                    attr: {
                                                                        'id': 'span-1'
                                                                    },
                                                                    css: {
                                                                        'position': 'relative',
                                                                        'text-align': 'center'
                                                                    },
                                                                    nodes: [
                                                                        {
                                                                            tag: 'span',
                                                                            attr: {
                                                                                'id': 'span-2'
                                                                            },
                                                                            css: {
                                                                                'position': 'relative',
                                                                                'text-align': 'center'
                                                                            },
                                                                            nodes: [
                                                                                {
                                                                                    tag: 'span',
                                                                                    attr: {
                                                                                        'id': 'span-3'
                                                                                    },
                                                                                    css: {
                                                                                        'display': 'inline-block',
                                                                                        'vertical-align': 'top',
                                                                                        'margin': '0px 0px 0px 0px'
                                                                                    },
                                                                                    children: [
                                                                                        iframe
                                                                                    ]
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });

                document.body.appendChild(ele);
                document.body.style.margin = 0;
                document.body.style.padding = 0;

                eleOffset = getOffsetRect(iframe, win);

                expect(eleOffset.x).toBe(241);
                expect(eleOffset.y).toBe(0);
            });
        });
    });
});
