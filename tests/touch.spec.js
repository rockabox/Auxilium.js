define([
    'aux/touch'
], function (Touch) {
    describe('Touch utils', function () {

        var touch;

        beforeEach(function () {
            touch = new Touch();
            callback = jasmine.createSpy('callback');
        });

        describe('_isTap', function () {
            beforeEach(function () {
                touch.touchStartX = 10;
                touch.touchStartY = 40;
            });

            it('should be detected', function () {
                expect(touch._isTap(10, 40)).toBeTruthy();
                expect(touch._isTap(40, 10)).toBeFalsy();
            });

            it('should be detected if within the threshold of 5', function () {
                expect(touch._isTap(12, 43)).toBeTruthy();
            });

            it('should not be detected if outside the threshold of 5', function () {
                expect(touch._isTap(15, 46)).toBeFalsy();
            });
        });

        it('should be able to detect isSwipe', function () {
            expect(touch._isSwipe(10, 40)).toBeTruthy();
            expect(touch._isSwipe(5, 9)).toBeFalsy();

        });

        describe ('tap', function () {
            var mockEvent,
                ele;

            beforeEach(function () {
                mockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX:  5,
                            pageY: 10
                        }
                    ],
                    preventDefault: function () {}
                };
                ele = document.createElement('div');
            });
            it('should add listeners for tap', function () {
                spyOn(touch.events, 'addListeners');

                touch.tap(ele, callback);

                expect(touch.events.addListeners.calls.count()).toEqual(4);
            });

            it('should call preventDefault', function () {
                spyOn(mockEvent, 'preventDefault').and.callThrough();

                touch.tap(ele, callback);

                touch.events.triggerEvent(ele, 'touchstart', mockEvent);
                touch.events.triggerEvent(ele, 'touchend', mockEvent);

                expect(mockEvent.preventDefault).toHaveBeenCalled();
            });

            it('should callback if events are mousedown and click', function () {
                touch.tap(ele, callback);

                touch.events.triggerEvent(ele, 'mousedown', mockEvent);
                touch.events.triggerEvent(ele, 'click', mockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should callback if events are touchstart and touchend', function () {
                touch.tap(ele, callback);

                touch.events.triggerEvent(ele, 'touchstart', mockEvent);
                touch.events.triggerEvent(ele, 'touchend', mockEvent);

                expect(callback).toHaveBeenCalled();
            });
        });

        describe ('swipe', function () {
            var startMockEvent,
                endMockEvent,
                ele;

            beforeEach(function () {
                startMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX:  30,
                            pageY: 20
                        }
                    ],
                    preventDefault: function () {}
                };
                endMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 70,
                            pageY: 50
                        }
                    ],
                    preventDefault: function () {}
                };
                ele = document.createElement('div');
            });

            it('should add listeners for swipe', function () {

                spyOn(touch.events, 'addListeners');

                touch.swipe(ele, callback, 'left right');

                expect(touch.events.addListeners.calls.count()).toEqual(2);
            });

            it('should call preventDefault', function () {
                spyOn(endMockEvent, 'preventDefault').and.callThrough();

                touch.swipe(ele, callback, 'left right');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', endMockEvent);

                expect(endMockEvent.preventDefault).toHaveBeenCalled();
            });

            it('should callback if events are touchstart and touchend', function () {
                touch.swipe(ele, callback, 'right');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', endMockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should callback on right', function () {
                var rightMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 140,
                            pageY: 30
                        }
                    ],
                    preventDefault: function () {}
                };
                touch.swipe(ele, callback, 'right');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', rightMockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should callback on left', function () {
                var leftMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: -35,
                            pageY: 10
                        }
                    ],
                    preventDefault: function () {}
                };
                touch.swipe(ele, callback, 'left');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', leftMockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should callback on up', function () {
                var upMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 30,
                            pageY: 5
                        }
                    ],
                    preventDefault: function () {}
                };
                touch.swipe(ele, callback, 'up');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', upMockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should callback on down', function () {
                var downMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 60,
                            pageY: 60
                        }
                    ],
                    preventDefault: function () {}
                };
                touch.swipe(ele, callback, 'down');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', downMockEvent);

                expect(callback).toHaveBeenCalled();
            });

            it('should not callback on distance small than threshold', function () {
                var downMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 35,
                            pageY: 28
                        }
                    ],
                    preventDefault: function () {}
                };
                touch.swipe(ele, callback, 'up down right down');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', downMockEvent);

                expect(callback).not.toHaveBeenCalled();
            });
        });

        describe ('multiple touch events', function () {
            var startMockEvent,
                endMockEvent,
                ele;

            beforeEach(function () {
                startMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX:  5,
                            pageY: 10
                        }
                    ],
                    preventDefault: function () {}
                };
                endMockEvent = {
                    pageX: 2,
                    pageY: 2,
                    changedTouches: [
                        {
                            pageX: 5,
                            pageY: 30
                        }
                    ],
                    preventDefault: function () {}
                };
                ele = document.createElement('div');
            });

            it('should only trigger a callback', function () {
                touch.tap(ele, callback);
                touch.swipe(ele, callback, 'down');

                touch.events.triggerEvent(ele, 'touchstart', startMockEvent);
                touch.events.triggerEvent(ele, 'touchend', endMockEvent);

                expect(callback).toHaveBeenCalled();
                expect(callback.calls.count()).toEqual(1);
            });
        });

        describe ('get cords', function () {
            it('should be able to return cords from page', function () {
                var mockEvent = {
                        pageX: 2,
                        pageY: 5
                    };
                expect(touch._getCords(mockEvent)['x']).toBe(2);
                expect(touch._getCords(mockEvent)['y']).toBe(5);
            });

            it('should be able to return cords from changedTouches', function () {
                var mockEvent = {
                        pageX: 2,
                        pageY: 2,
                        changedTouches: [
                            {
                                pageX:  5,
                                pageY: 10
                            }
                        ]
                    };
                expect(touch._getCords(mockEvent)['x']).toBe(5);
                expect(touch._getCords(mockEvent)['y']).toBe(10);
            });
        });

        describe ('get direction', function () {
            it('should return left', function () {
                var distanceX = 140,
                    distanceY =  100,
                    diffX = 10,
                    diffY = 30;
                expect(touch._getDirection(distanceX, distanceY, diffX, diffY)).toBe('left');
            });
            it('should return right', function () {
                var distanceX = 140,
                    distanceY = 100,
                    diffX = -10,
                    diffY = 40;
                expect(touch._getDirection(distanceX, distanceY, diffX, diffY)).toBe('right');
            });
            it('should return up', function () {
                var distanceX = 140,
                    distanceY = 160,
                    diffX = 50,
                    diffY = 40;
                expect(touch._getDirection(distanceX, distanceY, diffX, diffY)).toBe('up');
            });
            it('should return down', function () {
                var distanceX = 140,
                    distanceY = 160,
                    diffX = 50,
                    diffY = -60;
                expect(touch._getDirection(distanceX, distanceY, diffX, diffY)).toBe('down');
            });
        });

        describe('touch start handler', function () {
            var handler,
                mockEvent;

            beforeEach(function () {
                handler = touch._touchStartHandler();
                mockEvent = {
                        pageX: 2,
                        pageY: 2,
                        changedTouches: [
                            {
                                pageX:  5,
                                pageY: 10
                            }
                        ]
                    };
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should call getCords', function () {
                spyOn(touch, '_getCords').and.callThrough();

                handler({}, mockEvent);

                expect(touch._getCords).toHaveBeenCalled();
            });

            it('should not call getCords when data is undefined', function () {
                var undefinedData;
                spyOn(touch, '_getCords').and.callThrough();

                handler({}, undefinedData);

                expect(touch._getCords).not.toHaveBeenCalled();
            });

            it('touchStartX', function () {
                handler({}, mockEvent);
                expect(touch.touchStartX).toBe(5);
            });

            it('touchStartY', function () {
                handler({}, mockEvent);

                expect(touch.touchStartY).toBe(10);
            });
        });

        describe('touch end handler', function () {
            var handler,
                mockEvent,
                direction;

            beforeEach(function () {
                mockEvent = {
                        pageX: 2,
                        pageY: 2,
                        changedTouches: [
                            {
                                pageX:  5,
                                pageY: 50
                            }
                        ]
                    };
                direction = '';
                handler = touch._touchEndHandler(callback, direction);
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should call getCords', function () {
                spyOn(touch, '_getCords').and.callThrough();

                handler({}, mockEvent);

                expect(touch._getCords).toHaveBeenCalled();
            });

            describe('when data is undefined', function () {
                var mockEvent,
                    undefinedData;

                it('should callback if event type is click', function () {
                    mockEvent = {
                            'type': 'click'
                        };

                    handler(mockEvent, undefinedData);

                    expect(callback).toHaveBeenCalledWith(mockEvent, undefinedData);
                });

                it('should not call getCords is event type is not click', function () {
                    spyOn(touch, '_getCords');

                    handler({}, undefinedData);

                    expect(touch._getCords).not.toHaveBeenCalled();
                });

            });

            describe('tap', function () {
                beforeEach(function () {
                    handler = touch._touchEndHandler(callback, direction);
                });

                it('fires callback on tap', function () {
                    spyOn(touch, '_isTap').and.returnValue(true);

                    handler({}, mockEvent);

                    expect(touch._isTap).toHaveBeenCalledWith(5, 50);

                    expect(callback).toHaveBeenCalledWith(jasmine.any(Object), mockEvent);
                });
            });

            describe('swipe', function () {
                var startHandler,
                    endHandler,
                    startMockEvent,
                    endMockEvent,
                    direction;
                beforeEach(function () {
                    startMockEvent = {
                            pageX: 2,
                            pageY: 2,
                            changedTouches: [
                                {
                                    pageX:  5,
                                    pageY: 50
                                }
                            ]
                        };
                    endMockEvent = {
                                pageX: 2,
                                pageY: 2,
                                changedTouches: [
                                    {
                                        pageX:  20,
                                        pageY: 80
                                    }
                                ]
                            };
                    direction = 'down';
                    startHandler = touch._touchStartHandler()({}, startMockEvent);
                    endHandler = touch._touchEndHandler(callback, direction, true);
                });

                it('fires callback on swipe', function () {
                    var distanceX = 15,
                        distanceY = 30,
                        diffX = -15,
                        diffY = -30;

                    spyOn(touch, '_isSwipe').and.returnValue(true);
                    spyOn(touch, '_getDirection').and.returnValue('down');

                    endHandler({}, endMockEvent);

                    expect(touch._isSwipe).toHaveBeenCalledWith(distanceX, distanceY);

                    expect(touch._getDirection).toHaveBeenCalledWith(distanceX, distanceY, diffX, diffY);

                    expect(callback).toHaveBeenCalledWith(jasmine.any(Object), endMockEvent);
                });
            });
        });
    });
});
