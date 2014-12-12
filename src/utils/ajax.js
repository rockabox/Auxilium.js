define([], function () {

    function Ajax () {
        this.onload = function () {};
        this.onerror = function () {};
    }

    Ajax.prototype = {
        get: 'GET',
        post: 'POST',
        load: function (url, method) {
            var $this = this,
                xhr = $this.getRequest();

            if (xhr) {
                method = method ? method : $this.get;
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if ($this.onload) {
                                $this.onload(xhr);
                            }
                        } else {
                            if ($this.onerror) {
                                $this.onerror(xhr);
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
        }
    };

    return Ajax;
});
