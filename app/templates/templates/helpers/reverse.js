module.exports = function (context) {
    var options = arguments[arguments.length - 1];
    var ret = '';
    var i;

    if (context && context.length > 0) {
        for (i = context.length - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

    return ret;
};