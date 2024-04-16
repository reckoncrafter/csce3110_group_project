"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullWalk = exports.LinkedList = exports.Student = exports.llNode = void 0;
class llNode {
    constructor(d, n) {
        this.data = d !== null && d !== void 0 ? d : null;
        this.next = n !== null && n !== void 0 ? n : null;
    }
}
exports.llNode = llNode;
class Student {
    constructor(id, name, dob, ad_sr, ad_c, ad_st, ad_z) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.address_street = ad_sr;
        this.address_city = ad_c;
        this.address_state = ad_st;
        this.address_zip = ad_z;
    }
}
exports.Student = Student;
class LinkedList {
    constructor() {
        this.head = new llNode();
        this.cursor = this.head; // Objects are passed by reference
        this.tail = this.head;
    }
    // Returns the current item
    get() {
        return this.cursor.data;
    }
    // Advances the cursor
    step(count) {
        if (this.cursor.next == null)
            return false; // do not step if at end of list
        if (count) {
            for (let i = 0; i < count; i++) {
                if (this.cursor.next == null)
                    break;
                this.cursor = this.cursor.next;
            }
            return true;
        }
        this.cursor = this.cursor.next;
        return true;
    }
    // Appends node to the end of the linked list
    append(data) {
        console.time("append");
        if (this.head.data == null) {
            this.head.data = data;
            console.timeEnd("append");
            return;
        }
        this.tail.next = new llNode(data, null);
        this.tail = this.tail.next;
        console.timeEnd("append");
    }
    // Inserts at the current cursor position
    insert(data) {
        console.time("insert");
        let n = new llNode(data, this.cursor.next);
        this.cursor.next = n;
        console.time("insert");
    }
    // Removes the node at the current cursor position
    remove() {
        console.time("remove");
        let temp = this.head;
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
    }
    // Advances the cursor until the data equates searchTerm
    search(term) {
        console.time("search");
        this.reset();
        while (true) {
            let obj = this.get();
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
    }
    // Sets the cursor back to the head
    reset() {
        this.cursor = this.head;
    }
}
exports.LinkedList = LinkedList;
const fullWalk = (list) => {
    list.reset();
    do {
        console.log(list.get());
    } while (list.step());
};
exports.fullWalk = fullWalk;
