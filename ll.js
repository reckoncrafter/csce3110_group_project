"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullWalk = exports.LinkedList = exports.Student = exports.llNode = void 0;
var llNode = /** @class */ (function () {
    function llNode(d, n) {
        this.data = d !== null && d !== void 0 ? d : null;
        this.next = n !== null && n !== void 0 ? n : null;
    }
    return llNode;
}());
exports.llNode = llNode;
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
exports.Student = Student;
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
    LinkedList.prototype.step = function () {
        if (this.cursor.next == null)
            return false; // do not step if at end of list
        this.cursor = this.cursor.next;
        return true;
    };
    // Appends node to the end of the linked list
    LinkedList.prototype.append = function (data) {
        if (this.head.data == null) {
            this.head.data = data;
            return;
        }
        this.tail.next = new llNode(data, null);
        this.tail = this.tail.next;
    };
    // Inserts at the current cursor position
    LinkedList.prototype.insert = function (data) {
        var n = new llNode(data, this.cursor.next);
        this.cursor.next = n;
    };
    // Removes the node at the current cursor position
    LinkedList.prototype.remove = function () {
        var temp = this.head;
        while (temp.next != this.cursor) {
            if (temp.next == null)
                return;
            temp = temp.next;
        }
        temp.next = this.cursor.next;
        this.cursor = temp;
        // I can't seem to call delete on the cursor, but I assume it's deleted because the reference goes out of scope.
    };
    // Advances the cursor until the data equates searchTerm
    LinkedList.prototype.search = function (searchTerm) {
        while (this.cursor.data != searchTerm) {
            if (!this.step()) {
                return false;
            }
        }
        return true;
    };
    // Sets the cursor back to the head
    LinkedList.prototype.reset = function () {
        this.cursor = this.head;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var fullWalk = function (list) {
    list.reset();
    do {
        console.log(list.get());
    } while (list.step());
};
exports.fullWalk = fullWalk;
