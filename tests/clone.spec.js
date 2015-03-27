define([
    'aux/clone'
], function (clone) {
    describe('Clone an object util function', function () {
        var obj1, obj2, obj3;

        beforeEach(function () {
            obj1 = {
                'first_name': 'Barney',
                'last_name': 'Stinson',
                'nested_object': {},
                'nested_array': []
            };
            obj2 = obj1;
            obj3 = clone(obj1);
        });

        it('should be able to clone an object', function () {
            expect(obj1).toBe(obj2);
            expect(obj3).not.toBe(obj1);

            obj3['first_name'] = 'Ted';
            obj3['last_name'] = 'Mosby';

            expect(obj1['first_name']).toEqual('Barney');
            expect(obj2['first_name']).toEqual('Barney');
            expect(obj3['first_name']).toEqual('Ted');
        });

        it('should clone with a nested object', function () {
            expect(obj3['nested_object']).toEqual(obj1['nested_object']);
        });

        it('should clone with a nested array', function () {
            expect(obj3['nested_array']).toEqual(obj1['nested_array']);
        });
    });
});
