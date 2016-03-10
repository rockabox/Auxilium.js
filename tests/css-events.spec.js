define([
    'aux/css-events'
], function (CssEvents) {
    describe('Dealing with CSS3 Events (Animations and Transitions)', function () {
        var cssEvents,
            ele,
            cb;

        beforeEach(function () {
            cssEvents = new CssEvents();
            ele = document.createElement('div');
            cb = function () {
            };
        });

        describe('Browser Prefixes', function () {
            it('should have a prefix for Webkit (Chrome / Safari)', function () {
                expect(cssEvents.prefixes).toContain('webkit');
            });

            it('should have a prefix for Moz (Firefox)', function () {
                expect(cssEvents.prefixes).toContain('moz');
            });

            it('should have a prefix for Microsoft (IE10+)', function () {
                expect(cssEvents.prefixes).toContain('MS');
            });

            it('should have a prefix for Opera', function () {
                expect(cssEvents.prefixes).toContain('o');
            });

            it('should have a empty prefix', function () {
                expect(cssEvents.prefixes).toContain('');
            });
        });

        describe('Attaching CSS Listeners', function () {
            it('should attach a Animation Start listener with all prefixes', function () {
                spyOn(ele, 'addEventListener').and.callThrough();

                cssEvents.addEvent(ele, 'AnimationStart', cb);

                expect(ele.addEventListener).toHaveBeenCalledWith('webkitAnimationStart', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('mozAnimationStart', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('MSAnimationStart', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('oAnimationStart', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('animationstart', cb, false);
            });

            it('should attach a Transiton End listener with all prefixes', function () {
                spyOn(ele, 'addEventListener').and.callThrough();

                cssEvents.addEvent(ele, 'TransitionEnd', cb);

                expect(ele.addEventListener).toHaveBeenCalledWith('webkitTransitionEnd', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('mozTransitionEnd', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('MSTransitionEnd', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('oTransitionEnd', cb, false);
                expect(ele.addEventListener).toHaveBeenCalledWith('transitionend', cb, false);
            });
        });

        describe('Removing CSS Listeners', function () {
            it('should remove a Animation Start listener with all prefixes', function () {
                spyOn(ele, 'removeEventListener').and.callThrough();

                cssEvents.removeEvent(ele, 'AnimationStart', cb);

                expect(ele.removeEventListener).toHaveBeenCalledWith('webkitAnimationStart', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('mozAnimationStart', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('MSAnimationStart', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('oAnimationStart', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('animationstart', cb);
            });

            it('should attach a Transiton End listener with all prefixes', function () {
                spyOn(ele, 'removeEventListener').and.callThrough();

                cssEvents.removeEvent(ele, 'TransitionEnd', cb);

                expect(ele.removeEventListener).toHaveBeenCalledWith('webkitTransitionEnd', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('mozTransitionEnd', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('MSTransitionEnd', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('oTransitionEnd', cb);
                expect(ele.removeEventListener).toHaveBeenCalledWith('transitionend', cb);
            });
        });
    });
});
