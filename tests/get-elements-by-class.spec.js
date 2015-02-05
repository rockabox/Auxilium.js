define([
    'create-element',
    'get-elements-by-class'
], function (createElement, getElementByClass) {
    describe('Retrieve an element by class name', function () {
        var ele;

        beforeEach(function () {
            var i,
                simpsonClass = ['homer', 'bart', 'lisa', 'marge', 'maggie'],
                familyClass = ['brian', 'stewie', 'peter', 'lois', 'meg', 'chris'];

            ele = createElement('div', {
                attr: {
                    'class': 'wrapper'
                }
            });

            for (i = 0; i < simpsonClass.length; i++) {
                var simpsonEle = createElement('span', {
                    cssNames: [
                        'cartoon',
                        'simpsons',
                        simpsonClass[i]
                    ]
                });
                ele.appendChild(simpsonEle);
            }

            for (i = 0; i < familyClass.length; i++) {
                var familyEle = createElement('div', {
                    cssNames: [
                        'cartoon',
                        'family-guy',
                        familyClass[i]
                    ]
                });
                ele.appendChild(familyEle);
            }
        });

        it('should retrieve all with the same class', function () {
            var result = getElementByClass(ele, 'family-guy');

            expect(result.length).toBe(6);
        });

        it('should retrieve all with same class despite tag type', function () {
            var result = getElementByClass(ele, 'cartoon');

            expect(result.length).toBe(11);
        });

        it('should retrieve all with same class and the same tag type', function () {
            var result = getElementByClass(ele, 'cartoon', 'span');

            expect(result.length).toBe(5);
        });
    });
});
