define([], function () {
    /**
     * Loads a JSON File and passes the content to a callback function
     * @param {string}   jsonFile The location of the JSON file in which to load.
     * @param {Function} callback A function in which to run on completing teh load of the file.
     *
     * @example
     *  var file = 'http://example.com/pokemon.json',
     * 		callback = function (response) {
     * 			console.log(response);
     * 		};
     * // Will console.log the entire contents of the pokemon.json file loaded.
     */
    function loadJson (jsonFile, callback) {
        var xobj = new XMLHttpRequest();

        xobj.overrideMimeType('application/json');
        xobj.open('GET', jsonFile, true);

        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == '200') {
                try {
                    var response = JSON.parse(xobj.responseText);
                    callback(response);
                } catch (error) {
                    // Not a JSON object
                }
            }
        };

        xobj.send(null);
    }

    return loadJson;
});
