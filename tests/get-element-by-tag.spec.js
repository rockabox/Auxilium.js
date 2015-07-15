define([
    'aux/get-element-by-tag'
], function (getElementByTag) {
    describe('Test getting nested elements', function () {
        var ele,
            ele2,
            counter,
            callback = function (ele) {
                counter++;
                return true;
            };

        beforeEach(function () {
            counter = 0;
            ele = document.createElement('div');

            ele.appendChild(document.createElement('img'));
            ele.appendChild(document.createElement('span'));
            ele.appendChild(document.createElement('div'));

            ele2 = document.createElement('div');
            ele2.appendChild(document.createElement('img'));
            ele.appendChild(ele2);
        });

        it('Should get all image tags', function () {
            var result = getElementByTag(ele, 'img', callback);

            expect(counter).toBe(2);
        });

        it('Should get all span tags', function () {
            var result = getElementByTag(ele, 'span', callback);

            expect(counter).toBe(1);
        });

        it('Should get all tags when passed *', function () {
            var result = getElementByTag(ele, '*', callback);

            expect(counter).toBe(5);
        });

        it('Should only get elements within and not it\'s siblings', function () {
            var result = getElementByTag(ele2, '*', callback);

            expect(counter).toBe(1);
        });
    });
});
