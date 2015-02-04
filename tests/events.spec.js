define(['utils/events'], function (Events) {
    describe('Rockabox custom event', function () {

        var CLICK = 'click',
            element, events,
            handlers = {
                clickHandler: function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                },
                customHandler: function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };

        beforeEach(function () {
            spyOn(handlers, 'clickHandler');
            spyOn(handlers, 'customHandler');
            element = document.createElement('div');
            events = new Events();
        });

        it('is able to handle a click event.', function () {
            events.addListener(element, CLICK, handlers.clickHandler);
            events.triggerEvent(element, CLICK);

            expect(handlers.clickHandler.calls.count()).toBe(1);
        });

        it('fires correctly if the same event exists', function () {
            // onclick event already exists
            element.onclick = handlers.customHandler;
            events.addListener(element, CLICK, handlers.clickHandler);
            events.triggerEvent(element, CLICK);

            expect(handlers.clickHandler.calls.count()).toBe(1);
            expect(handlers.customHandler.calls.count()).toBe(1);

            element.onclick({
                type: CLICK
            });

            expect(handlers.clickHandler.calls.count()).toBe(2);
            expect(handlers.customHandler.calls.count()).toBe(2);
        });

        it('fires any number of events types assigned to a single element', function () {
            events.addListener(element, CLICK, handlers.clickHandler);
            events.addListener(element, 'hover', handlers.customHandler);

            events.triggerEvent(element, CLICK);
            events.triggerEvent(element, 'hover');

            expect(handlers.clickHandler.calls.count()).toBe(1);
            expect(handlers.customHandler.calls.count()).toBe(1);
        });

        it('passes data with event', function () {
            var returnedData,
                testData = {
                    name: 'test',
                    data: {}
                };

            events.addListener(element, events.VIEW, handlers.clickHandler);
            events.triggerEvent(element, events.VIEW, testData);

            expect(handlers.clickHandler).toHaveBeenCalledWith(jasmine.any(Object), testData);
        });

        it('fires multiple events.', function () {
            events.addListener(element, CLICK, handlers.clickHandler);
            events.addListener(element, CLICK, handlers.clickHandler);
            events.triggerEvent(element, CLICK);

            expect(handlers.clickHandler.calls.count()).toEqual(2);
        });

        it('remove a registered event.', function () {
            // Register two click events
            events.addListener(element, CLICK, handlers.clickHandler);
            events.addListener(element, CLICK, handlers.clickHandler);
            // Remove one of them
            events.removeEvent(element, CLICK, handlers.clickHandler);
            events.triggerEvent(element, CLICK);

            expect(handlers.clickHandler.calls.count()).toBe(1);

            // Remove both listeners
            events.removeEvent(element, CLICK, handlers.clickHandler);
            events.triggerEvent(element, CLICK);

            // Should not fire again
            expect(handlers.clickHandler.calls.count()).toBe(1);
        });
    });
});
