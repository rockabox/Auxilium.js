define([
    'aux/inner-html',
    'aux/get-elements-by-class'
], function (innerHTML, getElementByClass) {
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

        it('should attach class to the new node', function () {
            // Ensure that console log is not fired
            spyOn(console, 'log');
            var nodeContents = '<div>something</div><script class="some-class" type="text/javascript">' +
                    'console.log("something");</script><div><script>console.log("another");</script></div>';

            node = innerHTML(node, nodeContents);

            classNodes = getElementByClass(node, 'some-class');

            document.body.appendChild(node);
            expect(classNodes.length).toBe(1);
        });
    });
});
