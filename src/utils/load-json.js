function loadJson (jsonFile, callback) {
    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType('application/json');
    xobj.open('GET', jsonFile, true);

    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(JSON.parse(xobj.responseText));
        }
    };

    xobj.send(null);
}
