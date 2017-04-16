define([
    'aux/message'
], function (message) {
    describe('Message module', function () {
        var callback = jasmine.createSpy('callback'),
            data = {
                jennifer: 'lawrence'
            },
            domain = 'http://imgur.com';

        it('should call postMessage', function () {
            var msg = JSON.stringify(data);
            spyOn(window, 'postMessage');

            message.post(window, data, domain);

            expect(window.postMessage).toHaveBeenCalledWith(msg, domain);
        });

        it('should add a listener for messaging', function () {
            spyOn(message._events, 'addListener');

            message.receive(window, callback);

            expect(message._events.addListener).toHaveBeenCalled();
        });
    });
});
