"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ll_js_1 = require("./ll.js");
var faker_1 = require("@faker-js/faker");
function fakeStudent(id) {
    return new ll_js_1.Student(id, faker_1.faker.person.fullName(), faker_1.faker.date.birthdate({ min: 18, max: 65 }), faker_1.faker.location.street(), faker_1.faker.location.city(), faker_1.faker.location.state(), faker_1.faker.location.zipCode());
}
var list = new ll_js_1.LinkedList();
{ // test block: create student roster
    for (var i = 0; i < 100; i++) {
        var s = fakeStudent(i);
        list.append(s);
        console.log(s);
    }
}
process.exit();
{ // passed test block: list generation
    console.log("-------");
    list.head.data = 'A';
    list.append('B');
    list.append('C');
    list.append('D');
    (0, ll_js_1.fullWalk)(list);
}
{ // passed test block: insertion
    console.log("-------");
    list.reset();
    list.step();
    list.insert('5!');
    (0, ll_js_1.fullWalk)(list);
}
{ // passed test block: searching
    console.log("-------");
    list.reset();
    list.search('D');
    console.log(list.get());
}
{ // passed test block: deletion
    console.log("-------");
    list.reset();
    list.search('B');
    list.remove();
    (0, ll_js_1.fullWalk)(list);
}
