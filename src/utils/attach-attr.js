function attachAttr (ele, attr) {
    for (var a in attr) {
        ele.setAttribute(a, attr[a]);
    }
    return ele;
}
