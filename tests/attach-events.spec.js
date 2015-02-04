define(['utils/attach-events'], function (attachEvents) {
    describe('Attach event handlers', function () {
        it('should attach a click event to the element', function () {
            var ele = document.createElement('div'),
                spies = {
                    click: function () {
                        return true;
                    }
                };

            spyOn(spies, 'click');

            attachEvents(ele, spies);
            ele.onclick();
            expect(spies.click).toHaveBeenCalled();
        });
    });
});
