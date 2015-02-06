define([
    'aux/has-property'
], function (hasProperty) {
    describe('Utils hasProperty', function () {
        var obj;

        beforeEach(function () {
            obj = {
                obj1: {
                    obj2: {
                        obj3: {}
                    }
                },
                obj5: {}
            };
        });

        it('should return true if the properties exist', function () {
            expect(hasProperty(obj, 'obj5')).toBeTruthy();
            expect(hasProperty(obj, 'obj1.obj2')).toBeTruthy();
            expect(hasProperty(obj, 'obj1.obj2.obj3')).toBeTruthy();
        });

        it('should return false if the properties do not exist', function () {
            expect(hasProperty(obj, 'obj1.obj3')).toBeFalsy();
            expect(hasProperty(obj, 'obj2.obj3')).toBeFalsy();
            expect(hasProperty(obj, 'obj5.obj3')).toBeFalsy();
        });

        it('should not modify the original object', function () {
            var originalObj = obj;
            hasProperty(obj, 'obj1.obj2.obj3');

            expect(obj).toEqual({
                obj1: {
                    obj2: {
                        obj3: {}
                    }
                },
                obj5: {}
            });
        });
    });
});
