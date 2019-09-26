//扩充类型功能
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Array.method('render', function (f, value) {
    var i;
    for (i = 0; i < this.length; i++) {
        value = f(this[i], value);
    }
    return value;
})

var data = [4, 8, 15, 16, 23, 42];
var add = function (a, b) {
    return a + b
}
var result = data.render(add, 0);
console.log("result:" + result)

Array.dim = function (dimension, initial) {
    var a = [], i;
    for (i = 0; i < dimension; i++) {
        a[i] = initial;
    }
    return a;
}
var myArray = Array.dim(5, 1);
console.log("myArray:" + myArray);

