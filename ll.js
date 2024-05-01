"use strict";
/*
    This Typescript program implements a singly-linked list.

    To demonstrate the use of the linked list, the program populates the list with 100,000 objects
    representing database entries of student biographical data.
    These entries are generated with the @faker-js/faker library.

    Upon completing initialization, the program will enter an interactive session,
    where the user can add, remove, search, and update entries in the list.

    If the user passes the "--automatic" flag from the command line, the program
    will instead execute a series of operations on the linked list to benchmark
    its performance.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// defining classes
var llNode = /** @class */ (function () {
    function llNode(d, n) {
        this.data = d !== null && d !== void 0 ? d : null;
        this.next = n !== null && n !== void 0 ? n : null;
    }
    return llNode;
}());
var Student = /** @class */ (function () {
    function Student(id, name, dob, ad_sr, ad_c, ad_st, ad_z) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.address_street = ad_sr;
        this.address_city = ad_c;
        this.address_state = ad_st;
        this.address_zip = ad_z;
    }
    return Student;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = new llNode();
        this.cursor = this.head; // Objects are passed by reference
        this.tail = this.head;
    }
    // Returns the current item
    LinkedList.prototype.get = function () {
        return this.cursor.data;
    };
    // Advances the cursor
    LinkedList.prototype.step = function (count) {
        if (this.cursor.next == null)
            return false; // do not step if at end of list
        if (count) {
            for (var i = 0; i < count; i++) {
                if (this.cursor.next == null)
                    break;
                this.cursor = this.cursor.next;
            }
            return true;
        }
        this.cursor = this.cursor.next;
        return true;
    };
    // Appends node to the end of the linked list
    LinkedList.prototype.append = function (data, enableTimer) {
        if (enableTimer === void 0) { enableTimer = true; }
        if (enableTimer)
            console.time("append");
        if (this.head.data == null) {
            this.head.data = data;
            //console.timeEnd("append");
            return;
        }
        this.tail.next = new llNode(data, null);
        this.tail = this.tail.next;
        if (enableTimer)
            console.timeEnd("append");
    };
    // Inserts at the current cursor position
    LinkedList.prototype.insert = function (data) {
        console.time("insert");
        var n = new llNode(data, this.cursor.next);
        this.cursor.next = n;
        console.time("insert");
    };
    // Removes the node at the current cursor position
    LinkedList.prototype.remove = function () {
        console.time("remove");
        var temp = this.head;
        while (temp.next != this.cursor) {
            if (temp.next == null) {
                console.timeEnd("remove");
                return;
            }
            temp = temp.next;
        }
        temp.next = this.cursor.next;
        this.cursor = temp;
        console.timeEnd("remove");
        // I can't seem to call delete on the cursor, but I assume it's deleted because the reference goes out of scope.
    };
    // Advances the cursor until the data equates searchTerm
    LinkedList.prototype.search = function (term) {
        console.time("search");
        this.reset();
        while (true) {
            var obj = this.get();
            if (typeof term === "string") {
                if (obj.name == term) {
                    console.timeEnd("search");
                    return true;
                }
            }
            else {
                if (obj.id == term) {
                    console.timeEnd("search");
                    return true;
                }
            }
            if (!this.step())
                break;
        }
        console.timeEnd("search");
        return false;
    };
    // Sets the cursor back to the head
    LinkedList.prototype.reset = function () {
        this.cursor = this.head;
    };
    return LinkedList;
}());
var fullWalk = function (list) {
    list.reset();
    do {
        console.log(list.get());
    } while (list.step());
};
// initialization procedures
var faker_1 = require("@faker-js/faker");
var process_1 = require("process");
var readline_1 = require("readline");
var stdio = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
var ask = function (msg) { return new Promise(function (resolve) {
    return stdio.question(msg, function (response) { return resolve(response); });
}); };
faker_1.faker.seed(16); // fixed seed for predictability
function fakeStudent(id) {
    return new Student(id, faker_1.faker.person.fullName(), faker_1.faker.date.birthdate({ min: 18, max: 65 }), faker_1.faker.location.street(), faker_1.faker.location.city(), faker_1.faker.location.state(), faker_1.faker.location.zipCode());
}
var list = new LinkedList();
var nextID = 0;
console.time("generate database");
while (nextID < 100000) {
    var s = fakeStudent(nextID);
    list.append(s, false);
    //console.log(`added: ${s.name}`);
    nextID++;
}
console.timeEnd("generate database");
// main functions
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 2];
                return [4 /*yield*/, ask("Select test operation:\n1. Add student to the database\n2. Delete student\n3. Search by ID\n4. Search by Name\n5. Update record\n\n[1-5]: ")
                        .then(function (sel) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = sel;
                                    switch (_a) {
                                        case "1": return [3 /*break*/, 1];
                                        case "2": return [3 /*break*/, 3];
                                        case "3": return [3 /*break*/, 5];
                                        case "4": return [3 /*break*/, 7];
                                        case "5": return [3 /*break*/, 9];
                                    }
                                    return [3 /*break*/, 11];
                                case 1: return [4 /*yield*/, add_student()];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 12];
                                case 3: return [4 /*yield*/, delete_student()];
                                case 4:
                                    _b.sent();
                                    return [3 /*break*/, 12];
                                case 5: return [4 /*yield*/, search_by_id()];
                                case 6:
                                    _b.sent();
                                    return [3 /*break*/, 12];
                                case 7: return [4 /*yield*/, search_by_name()];
                                case 8:
                                    _b.sent();
                                    return [3 /*break*/, 12];
                                case 9: return [4 /*yield*/, update_record()];
                                case 10:
                                    _b.sent();
                                    return [3 /*break*/, 12];
                                case 11:
                                    console.error("Invalid selection.");
                                    _b.label = 12;
                                case 12: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}); };
var automatic = function () { return __awaiter(void 0, void 0, void 0, function () {
    var student, id, random_index;
    return __generator(this, function (_a) {
        // Adding student
        console.log("===== Adding student =====");
        student = new Student(nextID);
        nextID++;
        student.name = "John Doe";
        student.dob = faker_1.faker.date.birthdate({ min: 18, max: 65 });
        student.address_street = faker_1.faker.location.street();
        student.address_city = faker_1.faker.location.city();
        student.address_state = faker_1.faker.location.state();
        student.address_zip = faker_1.faker.location.zipCode();
        console.log(student);
        list.append(student);
        // Deleting student 
        console.log("===== Deleting student =====");
        id = faker_1.faker.number.int({ min: 0, max: 100000 });
        list.search(id);
        student = list.get();
        console.log(student);
        list.remove();
        // Searching by ID
        console.log("===== Searching by ID =====");
        id = faker_1.faker.number.int({ min: 0, max: 100000 });
        list.search(id);
        student = list.get();
        console.log(student);
        // Searching by Name
        console.log("===== Searching by Name =====");
        list.search("John Doe");
        student = list.get();
        console.log(student);
        // Updating Arbitrary Record
        console.log("===== Updating Arbitrary Record =====");
        console.time("update record");
        list.reset();
        random_index = faker_1.faker.number.int({ min: 0, max: 99999 });
        console.log("random_index: ", random_index);
        list.step(random_index);
        student = list.get();
        student.name = "John Rockefeller";
        console.log(student);
        console.timeEnd("update record");
        process.exit();
        return [2 /*return*/];
    });
}); };
function add_student() {
    return __awaiter(this, void 0, void 0, function () {
        var student, _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    student = new Student(nextID);
                    nextID++;
                    _a = student;
                    return [4 /*yield*/, ask("Name: ")];
                case 1:
                    _a.name = _h.sent();
                    _b = student;
                    _c = Date.bind;
                    return [4 /*yield*/, ask("DOB: ")];
                case 2:
                    _b.dob = new (_c.apply(Date, [void 0, _h.sent()]))();
                    _d = student;
                    return [4 /*yield*/, ask("Address (Street name): ")];
                case 3:
                    _d.address_street = _h.sent();
                    _e = student;
                    return [4 /*yield*/, ask("Address (City): ")];
                case 4:
                    _e.address_city = _h.sent();
                    _f = student;
                    return [4 /*yield*/, ask("Address (State): ")];
                case 5:
                    _f.address_state = _h.sent();
                    _g = student;
                    return [4 /*yield*/, ask("Address (Zip code): ")];
                case 6:
                    _g.address_zip = _h.sent();
                    console.log(student);
                    list.append(student);
                    return [2 /*return*/];
            }
        });
    });
}
function delete_student() {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b, student, confirm;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = Number).parseInt;
                    return [4 /*yield*/, ask("Enter student ID: ")];
                case 1:
                    id = _b.apply(_a, [_c.sent()]);
                    list.search(id);
                    student = list.get();
                    console.log(student);
                    return [4 /*yield*/, ask("Are you sure you want to delete the above?: [y/N] ")];
                case 2:
                    confirm = _c.sent();
                    if (confirm === "y") {
                        list.remove();
                    }
                    else {
                        console.log("No action taken.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function search_by_id() {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b, student;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = Number).parseInt;
                    return [4 /*yield*/, ask("Enter student ID: ")];
                case 1:
                    id = _b.apply(_a, [_c.sent()]);
                    if (list.search(id)) {
                        student = list.get();
                        console.log(student);
                    }
                    else {
                        console.log("Not found.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function search_by_name() {
    return __awaiter(this, void 0, void 0, function () {
        var name, student;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ask("Enter student name: ")];
                case 1:
                    name = _a.sent();
                    if (list.search(name)) {
                        student = list.get();
                        console.log(student);
                    }
                    else {
                        console.log("Not found");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function update_record() {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b, student, sel, _c, _d, _e, _f, _g, _h, _j, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    _b = (_a = Number).parseInt;
                    return [4 /*yield*/, ask("Enter student ID: ")];
                case 1:
                    id = _b.apply(_a, [_l.sent()]);
                    if (!list.search(id)) return [3 /*break*/, 17];
                    student = list.get();
                    console.log(student);
                    return [4 /*yield*/, ask("Select field to update:\n\n1. Name\n2. Date of Birth\n3. Address (Street)\n4. Address (City)\n5. Address (State)\n6. Address (Zip)\n[1-6]: ")];
                case 2:
                    sel = _l.sent();
                    _c = sel;
                    switch (_c) {
                        case "1": return [3 /*break*/, 3];
                        case "2": return [3 /*break*/, 5];
                        case "3": return [3 /*break*/, 7];
                        case "4": return [3 /*break*/, 9];
                        case "5": return [3 /*break*/, 11];
                        case "6": return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 3:
                    _d = student;
                    return [4 /*yield*/, ask("Enter new name: ")];
                case 4:
                    _d.name = _l.sent();
                    return [3 /*break*/, 16];
                case 5:
                    _e = student;
                    _f = Date.bind;
                    return [4 /*yield*/, ask("Enter new DOB: ")];
                case 6:
                    _e.dob = new (_f.apply(Date, [void 0, _l.sent()]))();
                    return [3 /*break*/, 16];
                case 7:
                    _g = student;
                    return [4 /*yield*/, ask("Enter new street: ")];
                case 8:
                    _g.address_street = _l.sent();
                    return [3 /*break*/, 16];
                case 9:
                    _h = student;
                    return [4 /*yield*/, ask("Enter new city: ")];
                case 10:
                    _h.address_city = _l.sent();
                    return [3 /*break*/, 16];
                case 11:
                    _j = student;
                    return [4 /*yield*/, ask("Enter new state: ")];
                case 12:
                    _j.address_state = _l.sent();
                    return [3 /*break*/, 16];
                case 13:
                    _k = student;
                    return [4 /*yield*/, ask("Enter new zip: ")];
                case 14:
                    _k.address_zip = _l.sent();
                    return [3 /*break*/, 16];
                case 15:
                    console.error("Invalid selection.");
                    _l.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    console.log("Not found.");
                    _l.label = 18;
                case 18: return [2 /*return*/];
            }
        });
    });
}
if (process_1.argv.includes("--automatic")) {
    automatic();
}
else {
    main();
}
