define([
    'aux/generate-uuid'
], function (generateUUID) {

    describe('Generate a UUID v4', function () {
        var uuid;

        beforeEach(function () {
            uuid = generateUUID();
        });

        it('should be a length of 36', function () {
            expect(uuid.length).toEqual(36);
        });

        it('should have 5 sections with specific lengths', function () {
            var sections = uuid.split('-');

            expect(sections.length).toBe(5);
            expect(sections[0].length).toBe(8);
            expect(sections[1].length).toBe(4);
            expect(sections[2].length).toBe(4);
            expect(sections[3].length).toBe(4);
            expect(sections[4].length).toBe(12);
        });

        it('should have the forth section start with either 8, 9, a or b always', function () {
            var startWith = ['a', 'b', '8', '9'],
                sections = uuid.split('-'),
                found;

            for (var i = 0; i < startWith.length; i++) {
                if (sections[3].charAt(0) === startWith[i]) {
                    found = true;
                }
            }

            expect(found).toBeTruthy();
        });

        it('should generate a random string', function () {
            var uuids = [uuid],
                uuidsSorted,
                results = [];

            for (var i = 0; i < 99999; i++) {
                uuids.push(generateUUID());
            }

            uuidsSorted = uuids.sort();

            for (var u = 0; u < uuids.length - 1; u++) {
                if (uuidsSorted[u + 1] == uuidsSorted[u]) {
                    results.push(uuidsSorted[u]);
                }
            }

            expect(results.length).toBe(0);
        });
    });
});
