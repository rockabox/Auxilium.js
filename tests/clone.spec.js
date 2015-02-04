define([
    'aux/clone'
], function (clone) {
    describe('Clone an object util function', function () {
        it('should be able to clone an object', function () {
            var obj1 = {
                    'first_name': 'Barney',
                    'last_name': 'Stinson'
                },
                obj2 = obj1,
                obj3 = clone(obj1);

            expect(obj1).toBe(obj2);
            expect(obj3).not.toBe(obj1);

            obj1['first_name'] = 'Ted';
            obj1['last_name'] = 'Mosby';

            expect(obj2['first_name']).toBe('Ted');
            expect(obj3['first_name']).toBe('Barney');
        });
    });
});
