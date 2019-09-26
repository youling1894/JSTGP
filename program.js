var stooge = {
    "fristName": "Jerome",
    "lastName": "Howard"
}
console.log(stooge["fristName"]);
console.log(stooge)

if (typeof Object.beget !== 'function') {
    Object.create = function (o) {
        var F = function () { };
        F.prototype = o;
        return new F();
    }
}
var another_stooge = Object.create(stooge);

console.log(another_stooge);

var name;
for (name in another_stooge) {
    console.log(name)
    console.log(typeof another_stooge[name])
}

var MyApp = {};
MyApp.stooge = {
    "fname": "ann",
    "lname": "lee"
}
MyApp.flight = {
    "departure": {
        "name": "flight",
        "age": 100
    }
}
console.log(MyApp.flight.departure.age)
MyApp.flight.departure.age = 90;
console.log(MyApp.flight.departure.age)

/////4.functions
var add = function (a, b) {
    return a + b;
}

//方法调用
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}
myObject.increment();
console.log("myObject.increment()" + myObject.value);
myObject.increment(2);
console.log("myObject.increment(2)" + myObject.value);
myObject.increment();
console.log("myObject.increment()" + myObject.value);

//函数调用
myObject.double = function () {
    var that = this;
    console.log(that);
    var helper = function () {
        this.value = add(that.value, that.value);
    };
    helper();
}
myObject.double();
console.log("myObject.helper()" + myObject.value)

//构造器调用模式
var Quo = function (string) {
    this.status = string;
}
Quo.prototype.get_status = function () {
    return this.status;
}
var myQuo = new Quo("confused");
console.log("myQuo.get_status()" + myQuo.get_status());

//apply调用模式
var array = [3, 4, 5];
var sum = add.apply(null, array);
console.log(sum);
var statusObject = {
    status: 'A-OK'
}
var status = Quo.prototype.get_status.apply(statusObject);
console.log(status)

//参数
var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    return sum;
}
console.log("arguments" + sum(1, 2, 3, 4, 5));

//异常
var add = function (a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
        throw {
            name: 'error',
            message: 'need number'
        }



    }
    return a + b;
}
console.log("error add()" + add(1, 2))

//扩充类型功能
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Number.method('integer', function () {
    return "integer"
})
console.log((4).integer())

//递归
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.fristChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
}

var getElementsByAttribute = function (att, value) {
    var results = [];
    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if (typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });
    return results;
}

//闭包
var myObject = (function () {
    var result = 0;
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    }
}());

var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    }
}
var myQuo = quo("fine");
console.log("closure " + myQuo.get_status());

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.background = "#FFFF" + hex + hex;
        if (level < 12) {
            level += 1;
            setTimeout(step, 100);
            console.log("#FFFF" + hex + hex);
        }
    };
    setTimeout(step, 100)
}
fade(document.body)

var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i);
        }
    }
    var i;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i);
        console.log(i);
    }
};
add_the_handlers(document.body)

//模块-extension
String.method('deentityify', function () {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    }
    return function () {
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        )
    };
}())
console.log('&lt;&quot;&gt;'.deentityify());

var serial_maker = function () {
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p) {
            prefix = String(p);
        },
        set_seq: function (s) {
            seq = s;
        },
        gensym: function () {
            var result = prefix + seq;
            seq += 1;
            return result;
        }
    }
}
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
for (var i = 0; i < 10; i++) {
    console.log(seqer.gensym());
}

//记忆
var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result != 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result
    }
    return fib;
}
var fib = fibonacci()
console.log(fib(10))

var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n];
        if (typeof result != 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return recur;
}

var fabonacci = memoizer([0, 1], function (recur, n) {
    return recur(n - 1) + recur(n - 2);
})

var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n - 1);
})

