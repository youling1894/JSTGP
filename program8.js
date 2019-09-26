//扩充类型功能
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

var a = ['a', 'b', 'c'];
a.push('d');
console.log("push:" + a);
var b = a.join('-')
console.log('join:' + b);

//pop
var aPop = ['a', 'b', 'c'];
var cPop = aPop.pop();
console.log("apop:" + aPop);
console.log("cpop:" + cPop);
Array.method('popFunc', function () {
    return this.splice(this.length - 1, 1)[0];
})
var resultPop = aPop.popFunc();
console.log("resultPop:" + resultPop);

//slice 参数为复制的起始位置
var aSlice = ['a', 'b', 'c'];
var bSlice = aSlice.slice(0, 1);
console.log("aslice:" + aSlice);
console.log("bslice:" + bSlice);

//sort
var nSort = [2, 7, 1, 0]
console.log("nSort:" + nSort.sort())

var mSort = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
mSort.sort(function (a, b) {
    if (a === b) {
        return 0;
    }
    if (typeof a === typeof b) {
        return a < b ? -1 : 1
    }
    return typeof a < typeof b ? -1 : 1
})
console.log("mSort" + mSort.sort())

//function.apply
Function.method('bind', function (that) {
    var method = this;
    slice = Array.prototype.slice;
    args = slice.apply(arguments, [1]);
    return function () {
        return method.apply(that,
            args.concat(slice.apply(arguments, [0])))
    };
})
var x = function () {
    return this.value;
}.bind({ value: 666 });
console.log("x():" + x())

//Object