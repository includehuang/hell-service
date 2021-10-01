/**
 * 替换所有匹配exp的字符串为指定字符串
 * @param exp 被替换部分的正则
 * @param newStr 替换成的字符串
 */
String.prototype.replaceAll = function (exp, newStr) {
    return this.replace(new RegExp(exp, "gm"), newStr)
};

/**
 * 原型：字符串格式化
 * @param args 格式化参数值
 */
String.prototype.format = function(args) {
    let result = this;
    if (arguments.length < 1) {
        return result;
    }

    let data = arguments; // 如果模板参数是数组
    if (arguments.length === 1 && typeof (args) == "object") { // 如果模板参数是对象
        data = args;
    }
    for ( let key in data) {
        // noinspection JSUnfilteredForInLoop
        let value = data[key];

        if (undefined !== value) {
            switch (typeof value){
                case "function": result = result.replaceAll("\\{" + key + "\\}", value(data));break;
                case "object": result = result.replaceAll("\\{" + key + "\\}", value.join(', '));break;
                default: result = result.replaceAll("\\{" + key + "\\}", value);
            }
        }
    }
    return result;
}