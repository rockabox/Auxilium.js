define([], function () {

    function hasProperty (obj, path) {
        var args = path.split('.');

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }

        return true;
    }

    return hasProperty;
});
