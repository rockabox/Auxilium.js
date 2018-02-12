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

        it('should return a function for `percentageTrigger` ', () => {
            var parallaxInit = parallaxScrolling.init(ele, container);

            expect(parallaxInit.percentageTrigger).toBe(parallaxScrolling.percentageTrigger);
        });

        it('should get the offset of the element', function () {
            spyOn(parallaxScrolling, '_offset').and.callThrough();

            parallaxScrolling.init(ele, container);

            expect(parallaxScrolling._offset).toHaveBeenCalledWith(container);
        });

        it('should assign `will-change` with `transform` to the element style', () => {
            parallaxScrolling.init(ele, container);

            expect(ele.style.willChange).toBe('transform');
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

                expect(parallaxScrolling._getWindowPositions).toHaveBeenCalledWith(overrideWin);
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

                var parallaxInit = parallaxScrolling.init(ele, container, 100, 50, window),
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

                parallaxInit.handler(overrideWin, {});

                expect(parallaxScrolling._getWindowPositions).toHaveBeenCalledWith(overrideWin);
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
            var winMock,
                windowPosition;

            beforeEach(() => {
                winMock = {};
            });

            it('should get how much the current document has been scrolled', function () {
                winMock.pageYOffset = 0;

                windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(windowPosition.scrollTop).toBe(0);
            });

            it('should get the windows height', function () {
                winMock.innerHeight = 10;

                windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(typeof windowPosition.winHeight).toBe('number');
            });

            it('should get the windows scroll position', function () {
                winMock.pageYOffset = 0;

                windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(typeof windowPosition.scrollTop).toBe('number');
            });

            it('should get window properties', function () {
                winMock = {
                    pageYOffset: 10,
                    innerHeight: 20
                };
                windowPosition = parallaxScrolling._getWindowPositions(winMock);

                expect(windowPosition.scrollTop).toBe(10);
                expect(windowPosition.winHeight).toBe(20);
            });

            it('should get element scroll and height properties', function () {
                var eleMock = {
                    scrollTop: 10,
                    clientHeight: 20
                };
                windowPosition = parallaxScrolling._getWindowPositions(eleMock);

                expect(windowPosition.scrollTop).toBe(10);
                expect(windowPosition.winHeight).toBe(20);
            });
        });

        it('should set the marginal position to an element', function () {
            spyOn(parallaxScrolling, '_attachCss');

            var elePos = parallaxScrolling._setElePosition(ele, 90);

            expect(parallaxScrolling._attachCss).toHaveBeenCalledWith(ele, jasmine.objectContaining({
                'transform': 'translate3d(0, 90px, 0)'
            }));

            expect(elePos).toBe(ele);
        });

        describe('_getScrollPosition', function () {
            var scrollPosition,
                ele,
                params,
                result;

            beforeEach(() => {
                spyOn(ParallaxScrolling.prototype, '_setElePosition');
                params = {};
                ele = document.createElement('div');
            });

            describe('top of window', () => {
                beforeEach(() => {
                    params = {
                        ele: ele,
                        winPosition: {
                            scrollTop: 100
                        },
                        offsetTop: 10
                    };
                });

                it('should return `scrollY` as `scrollTop` minus `offsetTop`', () => {
                    result = ParallaxScrolling.prototype._getScrollPosition(params);

                    expect(result.scrollY).toBe(90);
                });

                it('should return `scrollProgress` as zero', () => {
                    result = ParallaxScrolling.prototype._getScrollPosition(params);

                    expect(result.scrollProgress).toBe(0);
                });

                it('should call `_setElePosition` with `ele` and `scrollY`', () => {
                    result = ParallaxScrolling.prototype._getScrollPosition(params);

                    expect(ParallaxScrolling.prototype._setElePosition).toHaveBeenCalledWith(ele, 90);
                });
            });

            describe('not top', () => {
                beforeEach(() => {
                    spyOn(ParallaxScrolling.prototype, '_smallerWindow');
                    spyOn(ParallaxScrolling.prototype, '_largerWindow');

                    params = {
                        ele: ele,
                        winPosition: {
                            scrollTop: 0,
                            winHeight: 100
                        },
                        offsetTop: 20
                    };
                });

                describe('smaller window', () => {
                    beforeEach(() => {
                        params.eleHeight = 200;

                        ParallaxScrolling.prototype._smallerWindow.and.returnValue({
                            scrollY: 929292
                        });
                    });

                    it('should call `_smallerWindow`', () => {
                        result = ParallaxScrolling.prototype._getScrollPosition(params);

                        expect(ParallaxScrolling.prototype._smallerWindow).toHaveBeenCalledWith(200, 20, 0, 100);
                        expect(ParallaxScrolling.prototype._largerWindow).not.toHaveBeenCalled();
                    });

                    it('should call `_setElePosition` with the `scrollY` returned from `_smallerWindow`', () => {
                        result = ParallaxScrolling.prototype._getScrollPosition(params);

                        expect(ParallaxScrolling.prototype._setElePosition).toHaveBeenCalledWith(ele, 929292);
                    });
                });

                describe('larger window', () => {
                    beforeEach(() => {
                        params.eleHeight = 90;

                        ParallaxScrolling.prototype._largerWindow.and.returnValue({
                            scrollY: 1901
                        });
                    });

                    it('should call `_largerWindow`', () => {
                        result = ParallaxScrolling.prototype._getScrollPosition(params);

                        expect(ParallaxScrolling.prototype._largerWindow).toHaveBeenCalledWith(90, 20, 0, 100);
                        expect(ParallaxScrolling.prototype._smallerWindow).not.toHaveBeenCalled();
                    });

                    it('should call `_setElePosition` with the `scrollY` returned from `_smallerWindow`', () => {
                        result = ParallaxScrolling.prototype._getScrollPosition(params);

                        expect(ParallaxScrolling.prototype._setElePosition).toHaveBeenCalledWith(ele, 1901);
                    });
                });
            });
        });

        describe('`_smallerWindow`', () => {
            var result,
                eleHeight,
                offsetTop,
                scrollTop,
                winHeight;

            beforeEach(() => {
                eleHeight = 500;
                offsetTop = 0;
                scrollTop = 250;
                winHeight = 1000;

                result = ParallaxScrolling.prototype._smallerWindow(eleHeight, offsetTop, scrollTop, winHeight);
            });

            it('should return the scroll progress of the window in a percentage', () => {
                expect(result.scrollY).toBe(-125);
            });

            it('should return the scrollY compared to the window', () => {
                expect(result.scrollProgress).toBe(-0.25);
            });
        });

        describe('`_largerWindow`', function () {
            var scrollPercent,
                scrollTop,
                winHeight,
                offsetTop,
                eleHeight;

            it('should return 1 when top position is equal to the visibleHeight', function () {
                scrollTop = 200;
                winHeight = 1000;
                offsetTop = 1200;
                eleHeight = 600;

                scrollPosition = ParallaxScrolling.prototype._largerWindow(eleHeight, offsetTop, scrollTop, winHeight);

                expect(scrollPosition.scrollProgress).toBe(1);
                expect(scrollPosition.scrollY).toBe(-600);
            });

            it('should return 0 if the element is at the top of the browser viewport', function () {
                scrollTop = 1600;
                winHeight = 1000;
                offsetTop = 1600;
                eleHeight = 600;

                scrollPosition = ParallaxScrolling.prototype._largerWindow(eleHeight, offsetTop, scrollTop, winHeight);

                expect(scrollPosition.scrollProgress).toBe(0);
                expect(scrollPosition.scrollY).toBe(0);
            });

            it('should return `eleHeight` minus the number pixels the creative has pass the top', function () {
                scrollTop = 1500;
                winHeight = 1000;
                offsetTop = 1200;
                eleHeight = 600;

                scrollPosition = ParallaxScrolling.prototype._largerWindow(eleHeight, offsetTop, scrollTop, winHeight);

                expect(scrollPosition.scrollProgress).toBe(0.5);
                expect(scrollPosition.scrollY).toBe(300);
            });

            it('should return `scrollY` as 0', function () {
                eleHeight = 1200;
                offsetTop = 1500;
                scrollTop = 1300;
                winHeight = 1500;

                scrollPosition = ParallaxScrolling.prototype._largerWindow(eleHeight, offsetTop, scrollTop, winHeight);

                expect(scrollPosition.scrollProgress).toBe(0);
                expect(scrollPosition.scrollY).toBe(0);
            });
        });

        describe('`percentageTrigger`', () => {
            var callback;

            beforeEach(() => {
                callback = jasmine.createSpy('callback');
                ParallaxScrolling.prototype._lastProgress = 0.2;
            });

            it('should fire the callback with percentage', () => {
                ParallaxScrolling.prototype.percentageTrigger(0.3, callback);

                expect(callback).toHaveBeenCalledWith(70);
            });

            it('should not fire the callback if the progress matches the last progress', () => {
                ParallaxScrolling.prototype.percentageTrigger(0.2, callback);

                expect(callback).not.toHaveBeenCalled();
            });

            it('should assign the `lastProgress` on the instance', () => {
                ParallaxScrolling.prototype.percentageTrigger(0.9, callback);

                expect(ParallaxScrolling.prototype._lastProgress).toBe(0.9);
            });
        });
    });
});
