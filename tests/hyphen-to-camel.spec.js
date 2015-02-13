define([
    'aux/hyphen-to-camel'
], function (hyphenToCamel) {
    describe('Hyphen to camel case', function () {

        var hyphen = 'hello-dominos-pizza',
            camel = 'helloDominosPizza';

        it('should convert hyphen seperated words to camelCase', function () {
            var test = hyphenToCamel(hyphen);

            expect(test).toBe(camel);
        });
    });
});
