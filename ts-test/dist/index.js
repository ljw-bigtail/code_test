"use strict";
function init() {
    let isBlloen = true;
    let isNum = 123;
    let isString = 'abc';
    let symbol = Symbol();
    let obj = {
        [symbol]: "abc"
    };
    let isArr = [1, 2, 3];
    let isArr1 = [1, 2, 3];
    let Color;
    (function (Color) {
        Color[Color["Red"] = 2] = "Red";
        Color[Color["Green"] = 3] = "Green";
        Color[Color["Blue"] = 4] = "Blue";
    })(Color || (Color = {}));
    let green_color = Color.Green;
    let red_color = Color[2];
    function a(name) { }
}
init();
function theCityThatAlwaysSleeps() {
    let getCity;
    if (true) {
        let city = "Seattle";
        getCity = function () {
            return city;
        };
    }
    return getCity();
}
function loop() {
    for (let i = 0; i < 10; i++) {
        setTimeout(function () {
            console.log(i);
        }, 100 * i);
    }
}
function hi(name, date) {
    console.log(`Hi ${name}, today is ${date}.`);
}
hi('leo', new Date());
let surname;
let age;
let list2 = [1, 2, 3];
let list = [1, 2, 3];
let list1 = [1, 2, 3];
list1 = [1];
let obj = {
    x: 0
};
function getNum() {
    return 2;
}
const arr = ['1', '2', '3'];
arr.forEach(function (e) {
    console.log(e.toLocaleLowerCase());
});
function aa(id) {
    if (typeof id == "string") {
        console.log(id.toLocaleLowerCase());
    }
    else {
        console.log(id);
    }
}
aa(1);
aa('1');
function printCoord(pt) {
    var _a;
    console.log(`坐标：x: ${pt.x},y: ${(_a = pt.y) === null || _a === void 0 ? void 0 : _a.toLocaleString()}`);
}
printCoord({
    x: 100,
    y: 2
});
printCoord({
    x: 100,
});
const a2 = {
    x: 1,
    y: 2,
    c: 2,
};
const a = {
    x: 1,
    y: 2,
    c: 2,
    z: 2,
};
const myCanvas = document.getElementById('my-canvas');
const _myCanvas = document.getElementById('my-canvas');
const x = 'hello';
function printString(str1, str2) { }
printString('leo', 'left');
function print(strs, str1) {
    if (!strs) {
        return;
    }
    if (typeof strs == 'object') {
        for (const str of strs) {
            console.log(str);
        }
    }
    else if (typeof strs == 'string') {
        if (strs === str1) {
        }
        else {
        }
    }
    else {
    }
}
function logVal(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toString());
    }
}
function getX() {
    const a = Math.random();
    let x = a < 0.5;
    if (x) {
        return 'test';
    }
    return 100;
}
let a_x = getX();
a_x = '1';
a_x = 1;
function isFish(x) {
    return;
}
