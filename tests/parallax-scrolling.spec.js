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
            it('should return top', function () {
                expect(ParallaxScrolling.prototype._positionTop()).toBe(0);
            });

            describe('bottom', function () {
                it('should return as zero', function () {
                    expect(ParallaxScrolling.prototype._positionBottom(0)).toBe('0px');
                });

                it('should return of as a number as minus', function () {
                    expect(ParallaxScrolling.prototype._positionBottom(100)).toBe('-100px');
                });

                it('should return containing css pixels', function () {
                    expect(ParallaxScrolling.prototype._positionBottom(100)).toContain('px');
                });
            });
        });

        it('should set the marginal position to an element', function () {
            spyOn(parallaxScrolling, '_attachCss');

            var elePos = parallaxScrolling._setElePosition(ele, '90px');

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
    });
});
