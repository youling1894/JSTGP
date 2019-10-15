var add = function (a, b) {
    return a + b;
}

var myObject = {
    value: 10,
    increment: function (inc) {
        console.log(this.value)
        this.value = this.value + inc + 1;
    }
};

myObject.increment(5);
console.log("this inc:" + myObject.value)

myObject.double = function () {
    var that = this;
    var helper = function () {
        that.value = add(that.value, that.value)
    };
    helper();
}

myObject.double()
console.log("that value" + myObject.value)

var Quo = function (string) {
    this.status = string
}
Quo.prototype.get_status = function () {
    return this.status;
}

var myQuo = new Quo("confused")
console.log("quo's status:" + myQuo.get_status())

var array = [3, 4];
var sum = add.apply(null, array);
console.log("apply sum:" + sum);
var statusObject = {
    status: "A-OK"
};
var status = Quo.prototype.get_status.apply(statusObject)
console.log("apply statusObject:" + status)

var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
console.log("arguments sum:" + sum(1, 2, 3, 4, 5));

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function () {
    return this + 10;
});
console.log("add method integer:" + (20).integer());

var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
}

var myObject = (function () {
    var value = 0;
    return {
        increment: function (inc) {
            value = inc;
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
    };
};

var myQuo = quo("amazed");
console.log("close quo:" + myQuo.get_status())

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
}
fade(document.body)

var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i)
        }
    }
    var i;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].onclick = helper(i)
        console.log(i)
    }
}
add_the_handlers(document.body)

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
    };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();
var unique1 = seqer.gensym();
console.log("unique:" + unique);
console.log("unique1:" + unique1);


Function.method('curry', function () {
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments);
    var that = this;
    console.log(slice)
    console.log(args)
    console.log(that)
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)))
    }
})

var add1 = add.curry(1);
console.log(add1(6));

var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
for (var i = 0; i <= 10; i++) {
    console.log(fibonacci(i));
}

var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result != 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
};
