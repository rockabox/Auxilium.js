function attachCss (ele, css) {
    var s = ele.style;
    for (var c in css) {
        s[c] = css[c];
    }
    return ele;
}
