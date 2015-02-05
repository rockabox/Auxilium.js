define(['serialize'], function (serialize) {
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
    });
});
