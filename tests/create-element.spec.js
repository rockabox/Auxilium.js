define(['create-element'], function (createElement) {
    describe('Creating a DOM element', function () {

        it('should create an element with no styling or attributes', function () {
            var ele = createElement('div');
            expect(ele.tagName).toBeIgnoreCase('div');
        });

        it('should attach inline styling if passed through params', function () {
            var params = {
                    css: {
                        'display': 'none'
                    }
                },
                ele = createElement('div', params);

            expect(ele.style.display).toBeIgnoreCase('none');
        });

        it('should attach attributes if passed through params', function () {
            var params = {
                    attr: {
                        name: 'nick-is-awesome'
                    }
                },
                ele = createElement('div', params);

            expect(ele.getAttribute('name')).toBe('nick-is-awesome');
        });

        it('should attach an event handler if passed through params', function () {
            var counter = 0,
                params = {
                    events: {
                        click: function () {
                            counter++;
                        }
                    }
                },
                ele = createElement('img', params);

            ele.onclick();

            expect(counter).toBe(1);
        });
    });
});
