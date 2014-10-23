function serialize (params) {
    var str = [], key, value;
    for (var p in params) {
        if (params.hasOwnProperty(p) && params[p]) {
            key = encodeURIComponent(p);
            value = encodeURIComponent(params[p]);
            str.push(key + '=' + value);
        }
    }
    return str.join('&');
}
