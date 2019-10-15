var empty_object = {};
var stooge = {
    "first-name": "Tom",
    "last-name": "Ann"
};
var flight = {
    airline: "ocean",
    number: 001,
    departure: {
        "one": "first",
        "two": "second"
    },
    arrival: {
        "one": "A",
        "two": "B"
    }
}

console.log("stooge first " + stooge["first-name"])
console.log("flight number " + flight.number)
console.log("flight departure one " + flight.departure.one)

stooge["first-name"] = "Tonny"
console.log("stooge first update " + stooge["first-name"])


if (typeof Object.beget != 'function') {
    Object.create = function (o) {
        var F = function () { }
        F.prototype = o;
        return new F;
    }

}
var another_stooge = Object.create(stooge)
another_stooge["first-name"] = "Lily"
another_stooge["middle-name"] = "Han"
another_stooge.nickname = "L"
stooge.profession = 'actor'
console.log(another_stooge)

var name;
for (name in another_stooge) {
    console.log(typeof another_stooge[name])
    console.log(name + " " + another_stooge[name])
}
delete another_stooge["first-name"];
console.log("delete " + another_stooge["first-name"])

var MYAPP = {};

MYAPP.one_stooge = {
    "first-name": "Sundy",
    "last-name": "wang"
};
MYAPP.two_stooge = {
    airline: "ocean",
    number: 002,
    departure: {
        "one": "first1",
        "two": "second2"
    },
    arrival: {
        "one": "A1",
        "two": "B2"
    }
};
console.log(MYAPP)
