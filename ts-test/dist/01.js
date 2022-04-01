"use strict";
var _a, _PointX_f;
function getVal(arg) {
    console.log(arg.length);
    return arg;
}
function identity(arg) {
    return arg;
}
let identity_a = identity;
let identity_b = identity;
let identity_c = identity;
let my_identity_a = identity;
let my_identity_b = identity;
class GenericNumber {
    constructor(opt) {
        this.val1 = opt.val1;
    }
}
let myGenericNumber = new GenericNumber({ val1: 1 });
function identitylog(arg) {
    console.log(arg.length);
    return arg;
}
function getProp(obj, key) {
    return obj[key];
}
let obj_a = { a: 1, b: 2, c: 3 };
getProp(obj_a, 'a');
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nameTag = 'leo';
    }
}
class Animal {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new BeeKeeper();
    }
}
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nameTag;
createInstance(Bee).keeper.hasMask;
createInstance(Animal).numLegs;
function f() {
    return 1;
}
let persona = 1;
function createLabel(nameOrId) {
    if (typeof nameOrId == 'number') {
        return { id: nameOrId };
    }
    return { name: nameOrId };
}
function createLabel1(nameOrId) {
    if (typeof nameOrId == 'number') {
    }
    throw '';
}
let createLabelA = createLabel1('aa');
class PointX {
    constructor(val = '1') {
        this.x = 0;
        this.a = 0;
        this.b = 0;
        this.c = 0;
        this._length = 0;
        this.y = 0;
        this.z = val;
    }
    log(n) {
    }
    get length() {
        return this._length;
    }
    set length(val) {
        this._length = val;
    }
}
_a = PointX;
PointX.d = 100;
PointX.e = 100;
_PointX_f = { value: 10 };
const pt = new PointX('a');
pt.x = 1;
pt.y = 2;
const pt1 = new PointX();
class PointTest extends PointX {
    constructor() {
        super();
        this.a = 1;
    }
}
class Sonar {
    ping() {
        console.log(1);
    }
}
class Box {
    constructor(val) {
        this.contents = val;
    }
}
const b = new Box('hello');
class BoxA {
    constructor() {
        this.cont = '';
    }
    sameAs(oth) {
        return oth.cont === this.cont;
    }
}
class DerivedBoxA extends BoxA {
    constructor() {
        super(...arguments);
        this.othCont = '';
    }
}
const boxa = new BoxA();
const derviedboxa = new DerivedBoxA();
class FileSys {
    constructor(path, networked) {
        this.path = path;
        this.networked = networked;
    }
    isFile() {
        return this instanceof FileRep;
    }
    isDirectory() {
        return this instanceof Directory;
    }
    isNetworked() {
        return this.networked;
    }
}
class FileRep extends FileSys {
    constructor(path, content) {
        super(path, false);
        this.content = content;
    }
}
class Directory extends FileSys {
    constructor(path, content) {
        super(path, false);
        this.content = content;
        this.children = [];
    }
}
class Networked {
    constructor() {
        this.host = "";
    }
}
const fso = new FileRep('/document/test.html', '<html>');
if (fso.isFile()) {
    console.log(fso.content);
}
else if (fso.isDirectory()) {
    console.log(fso.children);
}
else if (fso.isNetworked()) {
    console.log(fso.host);
}
class Params {
    constructor(x) {
        this.x = x;
    }
}
const p = new Params(1);
console.log(p.x);
const someClass = class {
    constructor(val) {
        this.cont = val;
    }
};
const someClassA = new someClass('hello');
