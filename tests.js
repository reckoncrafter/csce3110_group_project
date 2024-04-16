"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ll_1 = require("./ll");
const faker_1 = require("@faker-js/faker");
const readline_1 = require("readline");
var stdio = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
const ask = (msg) => new Promise(resolve => stdio.question(msg, response => resolve(response)));
faker_1.faker.seed(16); // fixed seed for predictability
function fakeStudent(id) {
    return new ll_1.Student(id, faker_1.faker.person.fullName(), faker_1.faker.date.birthdate({ min: 18, max: 65 }), faker_1.faker.location.street(), faker_1.faker.location.city(), faker_1.faker.location.state(), faker_1.faker.location.zipCode());
}
var list = new ll_1.LinkedList();
var nextID = 0;
while (nextID < 100) {
    let s = fakeStudent(nextID);
    list.append(s);
    console.log(`added: ${s.name}`);
    nextID++;
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        yield ask(`Select test operation:
1. Add student to the database
2. Delete student
3. Search by ID
4. Search by Name
5. Update record

[1-5]: `)
            .then((sel) => __awaiter(void 0, void 0, void 0, function* () {
            switch (sel) {
                case "1":
                    yield add_student();
                    break;
                case "2":
                    yield delete_student();
                    break;
                case "3":
                    yield search_by_id();
                    break;
                case "4":
                    yield search_by_name();
                    break;
                case "5":
                    yield update_record();
                    break;
                default:
                    console.error("Invalid selection.");
            }
        }));
    }
});
main();
function add_student() {
    return __awaiter(this, void 0, void 0, function* () {
        let student = new ll_1.Student(nextID);
        nextID++;
        student.name = yield ask("Name: ");
        student.dob = new Date(yield ask("DOB: "));
        student.address_street = yield ask("Address (Street name): ");
        student.address_city = yield ask("Address (City): ");
        student.address_state = yield ask("Address (State): ");
        student.address_zip = yield ask("Address (Zip code): ");
        console.log(student);
        list.append(student);
    });
}
function delete_student() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = Number.parseInt(yield ask("Enter student ID: "));
        list.search(id);
        let student = list.get();
        console.log(student);
        let confirm = yield ask("Are you sure you want to delete the above?: [y/N] ");
        if (confirm === "y") {
            list.remove();
        }
        else {
            console.log("No action taken.");
        }
    });
}
function search_by_id() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = Number.parseInt(yield ask("Enter student ID: "));
        if (list.search(id)) {
            let student = list.get();
            console.log(student);
        }
        else {
            console.log("Not found.");
        }
    });
}
function search_by_name() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = yield ask("Enter student name: ");
        if (list.search(name)) {
            let student = list.get();
            console.log(student);
        }
        else {
            console.log("Not found");
        }
    });
}
function update_record() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = Number.parseInt(yield ask("Enter student ID: "));
        if (list.search(id)) {
            let student = list.get();
            console.log(student);
            let sel = yield ask(`Select field to update:

1. Name
2. Date of Birth
3. Address (Street)
4. Address (City)
5. Address (State)
6. Address (Zip)
[1-6]: `);
            switch (sel) {
                case "1":
                    student.name = yield ask("Enter new name: ");
                    break;
                case "2":
                    student.dob = new Date(yield ask("Enter new DOB: "));
                    break;
                case "3":
                    student.address_street = yield ask("Enter new street: ");
                    break;
                case "4":
                    student.address_city = yield ask("Enter new city: ");
                    break;
                case "5":
                    student.address_state = yield ask("Enter new state: ");
                    break;
                case "6":
                    student.address_zip = yield ask("Enter new zip: ");
                    break;
                default:
                    console.error("Invalid selection.");
            }
        }
        else {
            console.log("Not found.");
        }
    });
}
