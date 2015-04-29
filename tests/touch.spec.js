define([
    'aux/touch'
], function (Touch) {
    describe('Touch utils', function () {

        var touch,
            mockEvent = {
                preventDefault: function () {},
                touches: [],
                type: 'touchstart'
            };

        beforeEach(function () {
            touch = new Touch();
            callback = jasmine.createSpy('callback');
            spyOn(touch, '_preventDefault').and.callThrough();
            spyOn(touch, '_reset').and.callThrough();
        });

        it('should be able to detect isTap', function () {
            expect(touch._isTap()).toBeTruthy();
        });

        it('should preventDefault', function () {
            spyOn(mockEvent, 'preventDefault');

            touch._preventDefault(mockEvent);

            expect(mockEvent.preventDefault).toHaveBeenCalled();
        });

        it('should reset', function () {
            touch.touchStart = 1;
            touch.cachedX = 2;
            touch.cachedY = 3;
            touch.currentX = 4;
            touch.currentY = 5;

            touch._reset();

            expect(touch.touchStart).toEqual(false);
            expect(touch.cachedX).toEqual(0);
            expect(touch.cachedY).toEqual(0);
            expect(touch.currentX).toEqual(0);
            expect(touch.currentY).toEqual(0);
        });

        describe('touch start handler', function () {
            var handler;

            beforeEach(function () {
                jasmine.clock().install();
                handler = touch._touchStartHandler(callback);
            });

            afterEach(function () {
                jasmine.clock().uninstall();
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should call prevent default', function () {
                handler(jasmine.any(Object), mockEvent);

                expect(touch._preventDefault).toHaveBeenCalledWith(mockEvent);
            });

            it('should callback if tap is detected', function () {
                var ele = document.createElement('div');
                touch.events.addListener(ele, 'touchstart', handler);
                // Override tap detection
                touch._isTap = function () {
                    return true;
                };

                ele.ontouchstart(mockEvent);

                jasmine.clock().tick(500);
                expect(callback).toHaveBeenCalledWith(jasmine.any(Object), mockEvent);
            });
        });

        it('should add listeners for tap', function () {
            var node = document.createElement('div');

            spyOn(touch.events, 'addListeners');

            touch.tap(node, callback);

            expect(touch.events.addListeners.calls.count()).toEqual(2);
        });

        describe('touch end handler', function () {
            var handler;

            beforeEach(function () {
                handler = touch._touchEndHandler(callback);
            });

            it('should return a function', function () {
                expect(typeof handler).toBe('function');
            });

            it('should call prevent default', function () {
                handler(mockEvent);

                expect(touch._preventDefault).toHaveBeenCalledWith(mockEvent);
            });

            it('should callback if event type click', function () {
                mockEvent.type = 'click';

                handler(mockEvent);

                expect(callback).toHaveBeenCalledWith(mockEvent);
            });

            it('should reset', function () {
                handler(mockEvent);

                expect(touch._reset).toHaveBeenCalled();
            });
        });
    });
});
