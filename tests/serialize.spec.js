define([
    'aux/serialize'
], function (serialize) {
    describe('serialize', function () {
        it('should correctly serializes object to query string', function () {
            var query = serialize({
                dodgy: '?^%&$£',
                more: '%%{{}}',
                special: '你好世界',
                characters: 'áéíóúüñ¿¡'
            });

            expect(query.split('&').length).toEqual(4);
        });

        it('should allow for a zero to be attached to the query string', function () {
            var query = serialize({
                something: 'random',
                dwell: 0
            });

            expect(query).toContain('something=random&dwell=0');
        });
    });
});
