define([
    'aux/throttle'
], function (Throttle) {
    describe('Throttle', function () {
        var action,
            throttle,
            wait,
            time;

        beforeEach(function () {
            wait = 20;
            action = jasmine.createSpy('throttle');
            throttle = new Throttle(action, wait);
            time = 40;
        });

        it('should return an invoke function', function () {
            expect(typeof throttle.invoke).toBe('function');
        });

        describe('second time fired', function () {
            it('should set the last arguments', function () {
                throttle.invoke('a');
                throttle.invoke('b');

                expect(throttle.lastArgs[0]).toBe('b');
            });

            it('should set the last this', function () {
                throttle.invoke();
                throttle.invoke();

                expect(throttle.lastThis).not.toBe(null);
            });
        });

        describe('invoke', function () {
            beforeEach(function () {
                time = 3000;
                spyOn(throttle, '_now').and.returnValue(time);
            });

            it('should set the time', function () {

                throttle.invoke();

                expect(throttle._now).toHaveBeenCalled();
            });

            it('should check if can invoke the new action', function () {
                spyOn(throttle, '_shouldInvoke').and.callThrough();

                throttle.invoke();

                expect(throttle._shouldInvoke).toHaveBeenCalledWith(time);
            });

            describe('if can invoke', function () {
                beforeEach(function () {
                    spyOn(throttle, '_shouldInvoke').and.returnValue(true);
                });

                describe('first time invoke is called', function () {
                    it('should call `invokeFirst` if no timerId is set', function () {
                        spyOn(throttle, '_invokeFirst').and.callThrough();

                        throttle.invoke();

                        expect(throttle._invokeFirst).toHaveBeenCalledWith(time);
                    });
                });

                describe('time since last invoke is bigger than `wait` time', function () {
                    beforeEach(function () {
                        throttle.invoke();
                    });

                    it('should call `setTimeout`', function () {
                        spyOn(window, 'setTimeout');

                        throttle.invoke();

                        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), wait);
                    });

                    it('should call `invokeAction`', function () {
                        spyOn(throttle, '_invokeAction');

                        throttle.invoke();

                        expect(throttle._invokeAction).toHaveBeenCalledWith(time);
                    });
                });
            });

            describe('if can not invoke', function () {
                beforeEach(function () {
                    spyOn(throttle, '_shouldInvoke').and.returnValue(false);
                });

                it('should call `setTimeout` if no `timerId`', function () {
                    spyOn(window, 'setTimeout');

                    throttle.invoke();

                    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), wait);
                });

                it('should not call `setTimeout` if `timerId`', function () {
                    spyOn(window, 'setTimeout');
                    throttle.timerId = 10;
                    throttle.invoke();

                    expect(window.setTimeout).not.toHaveBeenCalled();
                });
            });

        });

        describe('Invoke Action', function () {
            beforeEach(function () {
                throttle._invokeAction(time);
            });

            it('shoud apply the throttle action', function () {
                expect(action).toHaveBeenCalled();
            });

            it('should set `lastInvokeTime` to time', function () {
                expect(throttle.lastInvokeTime).toBe(time);
            });

            it('should set `lastArgs` to null', function () {
                expect(throttle.lastArgs).toBe(null);
            });

            it('should set `lastThis` to null', function () {
                expect(throttle.lastThis).toBe(null);
            });
        });

        describe('Invoke First', function () {
            it('should call `setTimeout` if no `timerId`', function () {
                spyOn(window, 'setTimeout');
                throttle._invokeFirst(time);
                expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), wait);
            });

            it('should call `invokeAction`', function () {
                spyOn(throttle, '_invokeAction');
                throttle._invokeFirst(time);
                expect(throttle._invokeAction).toHaveBeenCalledWith(time);
            });
        });

        describe('Should Invoke', function () {
            var canInvoke;

            beforeEach(function () {
                time = 1000;
            });

            it('should return true if lastInvokeTime is 0, meaning we have not invoke', function () {
                canInvoke = throttle._shouldInvoke(time);

                expect(canInvoke).toBe(true);
            });

            it('should return true if time since last invoke is bigger `wait`', function () {
                throttle.lastInvokeTime = 950;
                canInvoke = throttle._shouldInvoke(time);

                expect(canInvoke).toBe(true);
            });

            it('should return false if time since last invoke is smaller `wait`', function () {
                throttle.lastInvokeTime = 990;
                canInvoke = throttle._shouldInvoke(time);

                expect(canInvoke).toBe(false);
            });
        });

        describe('Remaining wait', function () {
            beforeEach(function () {
                time = 30;
            });

            it('should return the waiting time left (`wait` minus the time since last invoke)', function () {
                throttle.lastInvokeTime = 25;
                remaining = throttle._remainingWait(time);

                expect(remaining).toBe(15);
            });

            it('should return 0, if lastInvokeTime is 0, meaning we have not invoke', function () {
                remaining = throttle._remainingWait(time);

                expect(remaining).toBe(0);
            });
        });

        describe('time expired', function () {
            beforeEach(function () {
                time = 30;
                spyOn(throttle, '_now').and.returnValue(time);
                spyOn(window, 'setTimeout');
            });

            it('should set the time', function () {

                throttle._timerExpired();

                expect(throttle._now).toHaveBeenCalled();
            });

            it('should check if can invoke', function () {
                spyOn(throttle, '_shouldInvoke').and.callThrough();

                throttle._timerExpired();

                expect(throttle._shouldInvoke).toHaveBeenCalledWith(time);
            });

            describe('if can invoke', function () {
                beforeEach(function () {
                    spyOn(throttle, '_shouldInvoke').and.returnValue(true);
                });

                it('should call `invokeLast`', function () {
                    spyOn(throttle, '_invokeLast').and.callThrough();

                    throttle._timerExpired();

                    expect(throttle._invokeLast).toHaveBeenCalledWith(time);
                });

                it('should not call `setTimeout`', function () {
                    throttle._timerExpired();

                    expect(window.setTimeout).not.toHaveBeenCalled();
                });
            });

            describe('if can not invoke', function () {
                beforeEach(function () {
                    spyOn(throttle, '_shouldInvoke').and.returnValue(false);
                });

                it('should call `setTimeout`', function () {
                    var remainingTime = 5;

                    spyOn(throttle, '_remainingWait').and.returnValue(remainingTime);

                    throttle._timerExpired();

                    expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), remainingTime);
                });

                it('should not call `invokeLast`', function () {
                    spyOn(throttle, '_invokeLast').and.callThrough();
                    throttle._timerExpired();

                    expect(throttle._invokeLast).not.toHaveBeenCalled();
                });
            });
        });

        describe('Invoke Last', function () {
            describe('has been debounced at least once (have `lastArgs`)', function () {
                beforeEach(function () {
                    throttle.lastArgs = ['a'];
                    spyOn(throttle, '_invokeAction');
                    throttle._invokeLast(time);
                });

                it('should call `invokeAction` when have `lastArgs`', function () {
                    expect(throttle._invokeAction).toHaveBeenCalledWith(time);
                });

                it('should set `lastArgs` to null', function () {
                    expect(throttle.lastArgs).toBe(null);
                });

                it('should set `lastThis` to null', function () {
                    expect(throttle.lastThis).toBe(null);
                });
            });

            describe('has not been debounced, `lastArgs` is null)', function () {
                it('should not call `invokeAction`', function () {
                    spyOn(throttle, '_invokeAction');
                    throttle._invokeLast(time);
                    expect(throttle._invokeAction).not.toHaveBeenCalled();
                });
            });
        });
    });
});
