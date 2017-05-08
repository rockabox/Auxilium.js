define([
    'aux/create-element'
], function (createElement) {
    var ParallaxScrolling,
        container,
        ele,
        mainEle,
        parallaxScrolling;

    describe('Parallax scrolling an element', function () {
        beforeEach(function () {
            ParallaxScrolling = require('aux/parallax-scrolling');

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
            var parallaxInit = parallaxScrolling.init(ele, container);

            expect(typeof parallaxInit.handler).toBe('function');
        });

        it('should return a function for resetting the offset', function () {
            var parallaxInit = parallaxScrolling.init(ele, container);

            expect(typeof parallaxInit.resetOffset).toBe('function');
        });

        it('should get the offset of the element', function () {
            spyOn(parallaxScrolling, '_offset').and.callThrough();

            parallaxScrolling.init(ele, container);

            expect(parallaxScrolling._offset).toHaveBeenCalledWith(container);
        });

        describe('overriding variables via handler', function () {
            it('should allow overriding of the window', function () {
                spyOn(parallaxScrolling, '_getWindowPositions').and.callThrough();

                var parallaxInit = parallaxScrolling.init(ele, container, 100, 50),
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

                parallaxInit.handler(overrideWin);

                expect(parallaxScrolling._getWindowPositions).toHaveBeenCalledWith(overrideWin, 'window');
            });

            it('should allow overriding of the offset', function () {
                spyOn(parallaxScrolling, '_getScrollPosition').and.callThrough();

                var overrideOffset = 20192,
                    parallaxInit = parallaxScrolling.init(ele, container, 100, 50),
                    scrollPosition = parallaxInit.handler(window, 20192);

                expect(parallaxScrolling._getScrollPosition).toHaveBeenCalledWith(jasmine.objectContaining({
                    offsetTop: 20192
                }));
            });

            it('should allow overriding the type of viewport (ele or window)', function () {
                spyOn(parallaxScrolling, '_getWindowPositions').and.callThrough();

                var parallaxInit = parallaxScrolling.init(ele, container, 100, 50, window, 'window'),
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

                parallaxInit.handler(overrideWin, {}, 'element');

                expect(parallaxScrolling._getWindowPositions).toHaveBeenCalledWith(overrideWin, 'element');
            });
        });

        describe('reset the offset via helper', function () {
            var parallaxInit;

            it('should call the get offset function', function () {
                parallaxInit = parallaxScrolling.init(ele, container);

                spyOn(parallaxScrolling, '_offset').and.callThrough();

                parallaxInit.resetOffset();

                expect(parallaxScrolling._offset).toHaveBeenCalledWith(container);
            });

            it('should return the offset of the element', function () {
                parallaxInit = parallaxScrolling.init(ele, container);

                spyOn(parallaxScrolling, '_offset').and.returnValue({y: 20000});

                var offset = parallaxInit.resetOffset();

                expect(offset).toBe(20000);
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

            it('should get the windows scroll position', function () {
                var windowPosition = parallaxScrolling._getWindowPositions(window);

                expect(typeof windowPosition.scrollTop).toBe('number');
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

            it('should get element scroll and height properties', function () {
                var eleMock = {
                        scrollTop: 10,
                        clientHeight: 20
                    },
                    windowPosition = parallaxScrolling._getWindowPositions(eleMock, 'element');

                expect(windowPosition.scrollTop).toBe(10);
                expect(windowPosition.winHeight).toBe(20);
            });
        });

        describe('checking position', function () {
            describe('top', function () {
                it('should return that the element is at the top of the viewport (flush @ top)', function () {
                    var atTop = ParallaxScrolling.prototype._isTop({
                            scrollTop: 200
                        }, 100, 100);

                    expect(atTop).toBeTruthy();
                });

                it('should return that the element is at the top of the viewport (not flush)', function () {
                    var atTop = ParallaxScrolling.prototype._isTop({
                            scrollTop: 200
                        }, 100, 99);

                    expect(atTop).toBeTruthy();
                });

                it('should return that the element is not at the top of the viewport', function () {
                    var atTop = ParallaxScrolling.prototype._isTop({
                            scrollTop: 200
                        }, 100, 101);

                    expect(atTop).toBeFalsy();
                });
            });

            describe('scrollable area', function () {
                var inScroll;

                it('should return false when scroll point is higher than window scroll position', function () {
                    inScroll = ParallaxScrolling.prototype._isScrollable({
                        scrollTop: 200
                    }, 100, 99);

                    expect(inScroll).toBeFalsy();
                });

                it('should return false when scroll position & window height is lower than scroll point', function () {
                    inScroll = ParallaxScrolling.prototype._isScrollable({
                        winHeight: 99,
                        scrollTop: 100
                    }, 100, 100);

                    expect(inScroll).toBeFalsy();
                });

                it('should return true when the scroll position is higher than the scroll point', function () {
                    inScroll = ParallaxScrolling.prototype._isScrollable({
                        winHeight: 100,
                        scrollTop: 100
                    }, 100, 99);

                    expect(inScroll).toBeTruthy();
                });
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

        describe('get scroll position', function () {
            var scrollPosition;

            it('should pass back scroll position when at bottom', function () {
                spyOn(ParallaxScrolling.prototype, '_isTop').and.returnValue(false);
                spyOn(ParallaxScrolling.prototype, '_isScrollable').and.returnValue(false);

                scrollPosition = ParallaxScrolling.prototype._getScrollPosition({
                    visibleHeight: 200,
                    eleHeight: 100
                });

                expect(scrollPosition.scrollProgress).toBe(1);
                // The visible height minus that of the original ele height
                expect(scrollPosition.scrollY).toBe(100);
            });

            it('should pass back the scroll position when at top', function () {
                spyOn(ParallaxScrolling.prototype, '_isTop').and.returnValue(true);

                scrollPosition = ParallaxScrolling.prototype._getScrollPosition({
                    visibleHeight: 200
                });

                expect(scrollPosition.scrollProgress).toBe(0);
                // The same as the visible height
                expect(scrollPosition.scrollY).toBe(200);
            });

            it('should get the position in which should be scrolled at', function () {
                spyOn(ParallaxScrolling.prototype, '_isTop').and.returnValue(false);
                spyOn(ParallaxScrolling.prototype, '_isScrollable').and.returnValue(true);

                scrollPosition = ParallaxScrolling.prototype._getScrollPosition({
                    winPosition: {
                        scrollTop: 200,
                        winHeight: 1000
                    },
                    visibleHeight: 200,
                    offsetTop: 200,
                    eleHeight: 1200
                });

                expect(scrollPosition.scrollProgress).toBe(0.2);
                // The same as the visible height
                expect(scrollPosition.scrollY).toBe(-40);
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
