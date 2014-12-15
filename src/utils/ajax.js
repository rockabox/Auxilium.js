define([], function () {

    function Ajax () {}

    Ajax.prototype = {
        load: function (url, method, onload, onerror) {
            var $this = this,
                xhr = $this.getRequest();

            if (xhr) {
                method = method ? method : 'get';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (onload) {
                                onload(xhr);
                            }
                        } else {
                            if (onerror) {
                                onerror(xhr);
                            }
                        }
                    }
                };
                xhr.open(method, url, true);
                xhr.send(null);
            }
            return xhr;
        },
        getRequest: function () {
            var xhr = false;
            if (typeof ActiveXObject !== 'undefined') {
                try {
                    xhr = new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (err) {
                        xhr = false;
                    }
                }
            } else if (window.XMLHttpRequest) {
                try {
                    xhr = new XMLHttpRequest();
                } catch (e) {
                    xhr = false;
                }
            }
            return xhr;
        },
        loadJson: function (url, method, onload, onerror) {
            this.load(url, method, function (xhr) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    onload(response);
                } catch (error) {
                    if (onerror) {
                        onerror(error);
                    }
                }
            }, onerror);
        }
    };

    return Ajax;
});
