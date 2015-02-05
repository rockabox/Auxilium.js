define([
    'remove-element'
], function (removeElement) {
    describe('Remove Element Util', function () {
        var child,
            id = 'remove-element-parent-test',
            parent;

        beforeEach(function () {
            child = document.createElement('div');
            parent = document.createElement('div');
            parent.id = id;
            parent.appendChild(child);
            document.body.appendChild(parent);
        });

        it('should remove all child nodes', function () {
            removeElement(parent);

            expect(parent.children.length).toBe(0);
            expect(document.getElementById(id)).toBe(parent);
            document.body.removeChild(parent);
        });

        it('should remove everything!', function () {
            removeElement(parent, true);

            expect(parent.children.length).toBe(0);
            expect(document.getElementById(id)).toBe(null);
        });
    });
});
