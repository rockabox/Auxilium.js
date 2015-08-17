define([
    'aux/create-element',
    'aux/parallax-scrolling'
], function (createElement, ParallaxScrolling) {
    var container,
        ele,
        mainEle,
        parallaxScrolling;

    describe('Parallax scrolling an element', function () {
        beforeEach(function () {
            ele = document.createElement('div');
            mainEle = document.createElement('div');
            container = createElement('div', {
                children: [
                    ele
                ]
            });

            mainEle.appendChild(container);

            parallaxScrolling = new ParallaxScrolling();
        });

        it('should return an initialise function', function () {
            expect(typeof parallaxScrolling.init).toBe('function');
        });

        it('should return a function handler', function () {
            var handler = parallaxScrolling.init(ele, container);

            expect(typeof handler).toBe('function');
        });

        it('should get the offset of the element', function () {
            spyOn(parallaxScrolling, '_offset').and.callThrough();

            var handler = parallaxScrolling.init(ele, container);

            expect(parallaxScrolling._offset).toHaveBeenCalledWith(container);
        });

        describe('overriding variables via handler', function () {
            it('should allow overriding of the window', function () {
                spyOn(parallaxScrolling, '_getWindowPositions').and.callThrough();

                var handler = parallaxScrolling.init(ele, container, 100, 50),
                    overrideWin = {
                        pageYOffset: 10,
                        innerHeight: 30,
                        document: {
                            documentElement: {
                                scrollTop: 10,
                                clientHeight: 30
                            }
                        }
                    };

                handler(overrideWin);

                expect(parallaxScrolling._getWindowPositions).toHaveBeenCalledWith(overrideWin);
            });

            it('should allow overriding of the offset', function () {
                parallaxScrolling._getScrollY = function (offsetTop) {
                    return offsetTop;
                };

                var overrideWin,
                    handler = parallaxScrolling.init(ele, container, 100, 50),
                    scrollY = handler(overrideWin, 20192);

                expect(scrollY).toBe(20192);
            });
        });

        describe('window positions', function () {
            it('should get how much the current document has been scrolled', function () {
                var windowPosition = parallaxScrolling._getWindowPositions(window);

                expect(windowPosition.scrollTop).toBe(0);
            });

            it('should get the windows height', function () {
                var windowPosition = parallaxScrolling._getWindowPositions(window);

                expect(typeof windowPosition.winHeight).toBe('number');
            });

            it('should get window properties', function () {
                var winMock = {
                        pageYOffset: 10,
                        innerHeight: 20
                    },
                    windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(windowPosition.scrollTop).toBe(10);
                expect(windowPosition.winHeight).toBe(20);
            });

            it('should get window properties IE8', function () {
                var winMock = {
                        document: {
                            documentElement: {
                                scrollTop: 30,
                                clientHeight: 10
                            }
                        }
                    },
                    windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(windowPosition.scrollTop).toBe(30);
                expect(windowPosition.winHeight).toBe(10);
            });
        });

        describe('getting the positions', function () {
            it('should return as a number', function () {
                expect(typeof ParallaxScrolling.prototype._positionBottom()).toBe('number');
            });

            it('should return top', function () {
                expect(ParallaxScrolling.prototype._positionTop()).toBe(0);
            });

            describe('bottom', function () {
                it('should return as a number', function () {
                    expect(typeof ParallaxScrolling.prototype._positionBottom(910)).toBe('number');
                });

                it('should return as zero', function () {
                    expect(ParallaxScrolling.prototype._positionBottom(0)).toBe(0);
                });

                it('should return of as a number as minus', function () {
                    expect(ParallaxScrolling.prototype._positionBottom(100)).toBe(-100);
                });
            });
        });

        describe('getting the position within the viewport', function () {
            var scrollTop,
                distance,
                offsetTop,
                position;

            it('should return that the content is at the top of the view port', function () {
                scrollTop = 50;
                offsetTop = 49;
                distance = 99;
                position = ParallaxScrolling.prototype._getViewportPosition(offsetTop, distance, scrollTop);

                expect(position).toBe('top');
            });

            describe('centre of viewport', function () {
                it('should return that the content is at the centre of the view port', function () {
                    scrollTop = 50;
                    offsetTop = 80;
                    distance = 31;
                    position = ParallaxScrolling.prototype._getViewportPosition(offsetTop, distance, scrollTop);

                    expect(position).toBe('centre');
                });

                it('should not return when scrolled passed', function () {
                    scrollTop = 50;
                    offsetTop = 49;
                    distance = 40;
                    position = ParallaxScrolling.prototype._getViewportPosition(offsetTop, distance, scrollTop);

                    expect(position).not.toBe('centre');
                });

                it('should not return that it is centre not scrolled enough', function () {
                    scrollTop = 50;
                    offsetTop = 80;
                    distance = 29;
                    position = ParallaxScrolling.prototype._getViewportPosition(offsetTop, distance, scrollTop);

                    expect(position).not.toBe('centre');
                });
            });

            it('should return that the content is within the centre of the view port', function () {
                offsetTop = 101;
                scrollTop = 100;
                distance = 1;
                position = ParallaxScrolling.prototype._getViewportPosition(offsetTop, distance, scrollTop);

                expect(position).toBe('bottom');
            });
        });

        it('should set the marginal position to an element', function () {
            spyOn(parallaxScrolling, '_attachCss');

            var elePos = parallaxScrolling._setElePosition(ele, 90);

            expect(parallaxScrolling._attachCss).toHaveBeenCalledWith(ele, jasmine.objectContaining({
                'top': '90px'
            }));

            expect(elePos).toBe(ele);
        });

        describe('getting the scroll ratio', function () {
            it('should return the ratio (not inverted)', function () {
                expect(ParallaxScrolling.prototype._getRatio(100, 50, 2)).toBe(-24);
            });

            it('should return the ratio (inverted)', function () {
                expect(parallaxScrolling._getRatio(100, 50, 2, true)).toBe(25);
            });
        });

        describe('getting the scroll percentages', function () {
            var percentage,
                scrolled,
                viewableHeight,
                contentHeight,
                inverted;

            describe('not inverted', function () {
                beforeEach(function () {
                    inverted = false;
                    contentHeight = 2000;
                    viewableHeight = 500;
                });

                it('should have a 25% when no scrolling and 25% is viewable at start', function () {
                    scrolled = 0;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(25);
                });

                it('should have a 50% when no scrolling and 50% is viewable at start', function () {
                    scrolled = -500;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(50);
                });

                it('should have 75% when all is scrolled', function () {
                    scrolled = -1000;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(75);
                });

                it('should have 100% when all content has been scrolled', function () {
                    scrolled = -1500;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(100);
                });
            });

            describe('inverted', function () {
                beforeEach(function () {
                    inverted = true;
                    contentHeight = 2000;
                    viewableHeight = 500;
                });

                it('should have a 0% when no scrolling', function () {
                    scrolled = -1500;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(25);
                });

                it('should have 25% when all is scrolled', function () {
                    scrolled = -1000;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(50);
                });

                it('should have a 50% when no scrolling and 50% is viewable at start', function () {
                    scrolled = -500;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(75);
                });

                it('should have 100% when all content has been scrolled', function () {
                    scrolled = 0;

                    percentage = ParallaxScrolling.prototype._getPercentageViewed(
                        scrolled,
                        contentHeight,
                        viewableHeight,
                        inverted
                    );

                    expect(percentage).toBe(100);
                });
            });
        });

        describe('getting of the element in view', function () {
            var scrollTop,
                viewportHeight,
                offsetTop,
                eleHeight;

            it('should return that 25% is in view', function () {
                scrollTop = 0;
                viewportHeight = 100;
                offsetTop = 50;
                eleHeight = 100;

                percent = ParallaxScrolling.prototype.
                            _getViewportPercent(scrollTop, viewportHeight, offsetTop, eleHeight);

                expect(percent).toBe(25);
            });

            it('should return that 50% is in view', function () {
                scrollTop = 50;
                viewportHeight = 100;
                offsetTop = 50;
                eleHeight = 100;

                percent = ParallaxScrolling.prototype.
                            _getViewportPercent(scrollTop, viewportHeight, offsetTop, eleHeight);

                expect(percent).toBe(50);
            });

            it('should return that 100% is in view', function () {
                scrollTop = 150;
                viewportHeight = 100;
                offsetTop = 50;
                eleHeight = 100;

                percent = ParallaxScrolling.prototype.
                            _getViewportPercent(scrollTop, viewportHeight, offsetTop, eleHeight);

                expect(percent).toBe(100);
            });
        });

        describe('triggering events for content viewable percentages', function () {
            var triggerEvent;

            beforeEach(function () {
                spyOn(ParallaxScrolling.prototype._events, 'triggerEvent');

                triggerEvent = ParallaxScrolling.prototype._events.triggerEvent;
                ParallaxScrolling.prototype._lastPercent = 0;
            });

            it('should trigger a percent when 10 is passed', function () {
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 10);

                expect(triggerEvent).toHaveBeenCalledWith(ele, 'aux.scroll-percent', jasmine.objectContaining({
                    percent: 10
                }));
            });

            it('should trigger a percent of 10 when passed something above 10 but lower than 20', function () {
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 19);

                expect(triggerEvent).toHaveBeenCalledWith(ele, 'aux.scroll-percent', jasmine.objectContaining({
                    percent: 10
                }));
            });

            it('should only trigger a percentile once', function () {
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 19);
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 19);

                expect(triggerEvent.calls.count()).toBe(1);
            });

            it('should trigger a percentile twice if it has changed since', function () {
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 19);
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 24);
                ParallaxScrolling.prototype._scrollPercentTriggers(ele, 19);

                expect(triggerEvent.calls.count()).toBe(3);
            });
        });
    });
});
