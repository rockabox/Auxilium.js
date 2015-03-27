define([
    'aux/console-logger'
], function (logger) {
    describe('Using a browser\'s logging system', function () {
        beforeEach(function () {
            window.console = window.console || {};
            window.console.log = window.console.log || function () {};
            window.console.error = window.console.error || function () {};
        });

        it('should default to use console log when type not passed', function () {
            spyOn(window.console, 'log');

            logger('I work');

            expect(window.console.log).toHaveBeenCalledWith('I work');
        });

        it('should use console error when specified', function () {
            spyOn(window.console, 'error');

            logger('AAAH ERROR to CONSOLE!', 'error');

            expect(window.console.error).toHaveBeenCalledWith('AAAH ERROR to CONSOLE!');
        });

        it('should fallback to use console log when passed type isn\'t accessible', function () {
            spyOn(window.console, 'log');

            logger('uhoh fallback to log!', 'someRandomConsoleMethod');

            expect(window.console.log).toHaveBeenCalledWith('uhoh fallback to log!');
        });
    });
});
