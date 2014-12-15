define(['utils/ajax'], function (Ajax) {

    function LoadJson () {
        this.ajax = new Ajax();
    }

    /**
     * Loads a JSON File and passes the content to a callback function
     * @param {string}   jsonFile The location of the JSON file in which to load.
     * @param {Function} callback A function in which to run on load complete of file.
     *
     * @example
     *  var file = 'http://example.com/pokemon.json',
     * 		callback = function (response) {
     * 			console.log(response);
     * 		};
     * // Will console.log the entire contents of the pokemon.json file loaded.
     */
    LoadJson.prototype.load = function (jsonFile, callback) {
        this.ajax.onload = function (xhr) {
            try {
                var response = JSON.parse(xhr.responseText);
                callback(response);
            } catch (error) {}
        };
        this.ajax.load(jsonFile);
    };

    return LoadJson;
});
