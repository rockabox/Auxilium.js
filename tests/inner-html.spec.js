define([
    'aux/inner-html'
], function (innerHTML) {
    describe('Parse HTML', function () {
        var node;

        beforeEach(function () {
            node = document.createElement('div');
        });

        afterEach(function () {
            document.body.removeChild(node);
        });

        it('should execute the contents of a script tag', function () {
            spyOn(console, 'log');

            var nodeContents = '<div>something</div><script>console.log("something");</script>';

            node = innerHTML(node, nodeContents);

            expect(window.console.log).not.toHaveBeenCalled();

            document.body.appendChild(node);
            expect(window.console.log).toHaveBeenCalledWith('something');
        });

        it('should run the contents of two individual script tags', function () {
            spyOn(console, 'log');

            var nodeContents = '<div>something</div><script>console.log("something");</script>' +
                '<div><script>console.log("another");</script></div>';

            node = innerHTML(node, nodeContents);

            expect(window.console.log).not.toHaveBeenCalled();

            document.body.appendChild(node);
            expect(window.console.log).toHaveBeenCalledWith('something');
            expect(window.console.log).toHaveBeenCalledWith('another');
        });
    });
});
