//伪类
var Mammal = function (name) {
    this.name = name;
}
Mammal.prototype.getName = function () {
    return this.name;
}
Mammal.prototype.says = function () {
    return this.saying || ''
}

var myMammal = new Mammal("tony");
console.log("TONY:" + myMammal.getName());

var Cat = function (name) {
    this.name = name;
    this.saying = "miao";
}
Cat.prototype = new Mammal();
Cat.prototype.getName = function () {
    return this.saying + this.name;
}
Cat.prototype.run = function () {
    return "run";
}
var myCat = new Cat("baby");
console.log("its name=" + myCat.getName());
console.log("its can=" + myCat.run());

//扩充类型功能
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}

Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
});


Number.method('integer', function () {
    return "integer"
})
var Dog = function (name) {
    this.name = name;
    this.use = "play";
}.inherits(Mammal)
    .method('getNmae', function () {
        return this.name;
    })
    .method('run', function () {
        return "run"
    })
var myDog = new Dog("Tom");
console.log("its name=" + myDog.getName() + ",can " + myDog.run());

//原型
var myHome = {
    name: 'YUANLIN ROAD',
    getName: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
}

var myRoom = Object.create(myHome);
myRoom.name = "Piano";
myRoom.saying = "dang!"
console.log(myRoom.says());

//函数化
var mammal = function (spec) {
    var that = {};
    that.getName = function () {
        return spec.name;
    }
    that.says = function () {
        return spec.saying;
    }
    return that;
}
var my_mammal = mammal({ name: 'Tom' })
console.log("my_mammal Name:" + my_mammal.getName());

var fox = function (spec) {
    spec.saying = spec.saying || "hi"
    var that = mammal(spec);
    that.eat = function (food) {
        return food
    };
    that.getName = function () {
        return spec.saying + "--" + spec.name + "--" + that.says();
    }
    return that;
}
var mrFox = fox({ name: 'herry' });
console.log("fox:" + mrFox.eat("apple") + mrFox.getName());

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    // return function () {
    //     return method.apply(that, arguments)
    // };
})

var coolfox = function (spec) {
    var that = fox(spec),
        super_get_name = that.superior('getNmae');
    // that.getName = function (food) {
    //     return food + "+++" + super_get_name();
    // }
    return that;
}

var mycoolfox = coolfox({ name: "peter" });
console.log("super-get-name:" + mycoolfox.getName("pear"));

//部件
// var eventuality = function (that) {
//     var registry = {};
//     that.fire = function (event) {
//         var array,
//             func,
//             handler
//         i,
//             type = typeof event === 'string' ? event : event.type;
//         if (registry.hasOwnProperty(type)) {
//             array = registry[type];
//             for (i = 0; i < array.length; i++) {
//                 handler = array[i];
//                 func = handler.method;
//                 if (typeof func === 'string') {
//                     func = this[func];
//                 }
//                 func.apply(this,)
//             }
//         }
//     }
// }