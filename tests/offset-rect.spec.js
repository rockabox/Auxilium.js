define([
    'aux/create-element',
    'aux/offset-rect'
], function (createElement, OffsetRect) {
    describe('Get the offset top and left of an element compared to the window', function () {
        var ele,
            eleOffset,
            win,
            offsetRect;

        beforeEach(function () {
            win = top.window;
            document.body.style.margin = 0;
            document.body.style.padding = 0;
            offsetRect = new OffsetRect();
        });

        describe('get offset attached to DOM', function () {
            describe('attached to DOM', function () {
                afterEach(function () {
                    document.body.removeChild(ele);
                });

                it('should return the current offset of an element which has no offsets set', function () {
                    ele = document.createElement('div');

                    document.body.appendChild(ele);

                    eleOffset = offsetRect.getOffset(ele);

                    expect(eleOffset.x).toBe(0);
                    expect(eleOffset.y).toBe(0);
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

                    eleOffset = offsetRect.getOffset(mainEle);

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

                    eleOffset = offsetRect.getOffset(mainEle);

                    expect(eleOffset.x).toBe(20);
                    expect(eleOffset.y).toBe(-5);
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

                    eleOffset = offsetRect.getOffset(iframe);

                    expect(eleOffset.x).toBe(241);
                    expect(eleOffset.y).toBe(0);
                });
            });

            describe('getBoundingClientRect not exists', function () {
                it('should return correct offset', function () {
                    ele = {
                        offsetTop: 10,
                        offsetLeft: 9,
                        offsetParent: {
                            offsetTop: 5,
                            offsetLeft: 1
                        },
                        getBoundingClientRect: '',
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

                    eleOffset = offsetRect.getOffset(ele);

                    expect(eleOffset.x).toBe(10);
                    expect(eleOffset.y).toBe(15);
                });
            });
        });

        describe('get offset rect', function () {
            var mockWin;

            it('should return offset only if there is no scroll', function () {
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
                    'pageXOffset': 0,
                    'pageYOffset': 0
                };

                document.body.appendChild(ele);

                eleOffset = offsetRect.getOffsetRect(mainEle, mockWin);

                expect(eleOffset.x).toBe(25);
                expect(eleOffset.y).toBe(20);
            });

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
                    'pageYOffset': 100
                };

                document.body.appendChild(ele);

                eleOffset = offsetRect.getOffsetRect(mainEle, mockWin);

                expect(eleOffset.x).toBe(225);
                expect(eleOffset.y).toBe(120);
            });

            it('should add scrollX and scrollY if not pageXOffset and pageYOffset', function () {
                spyOn(offsetRect, 'getScroll').and.returnValue({
                    scrollX: 100,
                    scrollY: 200
                });
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

                eleOffset = offsetRect.getOffsetRect(mainEle, {});

                expect(eleOffset.x).toBe(125);
                expect(eleOffset.y).toBe(220);
            });
        });

        describe('Get Scroll', function () {
            var scroll,
                doc,
                win;

            beforeEach(function () {
                win = {};
            });

            it('should return pageXOffset and pageYOfsset scroll values', function () {
                win = {
                    pageXOffset: 144,
                    pageYOffset: 20
                };
                doc = {
                    body: {
                        parentNode: {
                            scrollLeft: 435,
                            scrollTop: 98
                        }
                    }
                };

                scroll = offsetRect.getScroll(win, doc);

                expect(scroll.scrollX).toBe(144);
                expect(scroll.scrollY).toBe(20);
            });

            it('should return documentElement scroll values', function () {
                doc = {
                    documentElement: {
                        scrollLeft: 123,
                        scrollTop: 78
                    },
                    body: {
                        scrollLeft: 0,
                        scrollTop: 0
                    }
                };

                scroll = offsetRect.getScroll(win, doc);

                expect(scroll.scrollX).toBe(123);
                expect(scroll.scrollY).toBe(78);
            });

            it('should return body parentNode scroll values.', function () {
                doc = {
                    body: {
                        parentNode: {
                            scrollLeft: 435,
                            scrollTop: 98
                        }
                    }
                };

                scroll = offsetRect.getScroll({}, doc);

                expect(scroll.scrollX).toBe(435);
                expect(scroll.scrollY).toBe(98);
            });

            it('should return body scroll values.', function () {
                doc = {
                    body: {
                        scrollLeft: 20,
                        scrollTop: 198
                    }
                };

                scroll = offsetRect.getScroll(win, doc);

                expect(scroll.scrollX).toBe(20);
                expect(scroll.scrollY).toBe(198);
            });
        });
    });
});
