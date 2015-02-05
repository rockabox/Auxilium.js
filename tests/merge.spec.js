define([
    'merge'
], function (merge) {
    describe('Merge utility functions', function () {
        it('should be able to merge two objects', function () {
            var obj1 = {
                    name: 'test1',
                    age: '101',
                    nest: {
                        level: 1,
                        log: 1
                    }
                },
                obj2 = {
                    name: 'test2',
                    nest: {
                        level: 2
                    }
                };

            merge(obj1, obj2);

            expect(obj1.name).toEqual('test2');
            expect(obj1.age).toEqual('101');
            expect(obj1.nest.level).toEqual(2);
        });
    });
});
