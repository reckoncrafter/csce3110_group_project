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

// defining classes
class llNode{
    data: Student | null | undefined;
    next: llNode | null | undefined;

    constructor(d?: Student, n?: llNode | null){
        this.data = d ?? null;
        this.next = n ?? null;
    }
}
class Student{
    id: number;
    name?: string;
    dob?: Date;
    address_street?: string
    address_city?: string;
    address_state?: string;
    address_zip?: string;

    constructor(id:number, name?:string, dob?:Date, ad_sr?:string, ad_c?:string, ad_st?:string, ad_z?:string){
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.address_street = ad_sr;
        this.address_city = ad_c;
        this.address_state = ad_st;
        this.address_zip = ad_z;
    }
}
class LinkedList{
    // This is a singly linked list
    head: llNode;
    cursor: llNode;
    tail: llNode;
    
    constructor(){
        this.head = new llNode();
        this.cursor = this.head; // Objects are passed by reference
        this.tail = this.head;
    }

    // Returns the current item
    get(){
        return this.cursor.data;
    }
    // Advances the cursor
    step(count?:number): boolean{
        if(this.cursor.next == null) return false; // do not step if at end of list

        if(count){
            for(let i = 0; i < count; i++){
                if(this.cursor.next == null) break;
                this.cursor = this.cursor.next!;
            }
            return true;
        }

        this.cursor = this.cursor.next!;
        return true;
    }
    // Appends node to the end of the linked list
    append(data: Student){
        //console.time("append");
        if(this.head.data == null){
            this.head.data = data;
            //console.timeEnd("append");
            return;
        }

        this.tail.next = new llNode(data, null);
        this.tail = this.tail.next;
        //console.timeEnd("append");
    }
    // Inserts at the current cursor position
    insert(data: Student){
        console.time("insert");
        let n = new llNode(data, this.cursor.next);
        this.cursor.next = n;
        console.time("insert");
    }
    // Removes the node at the current cursor position
    remove(){
        console.time("remove");
        let temp = this.head;
        while(temp.next != this.cursor){
            if(temp.next == null){
                console.timeEnd("remove");
                return;
            }
            temp = temp.next!;
        }
        temp.next = this.cursor.next;
        this.cursor = temp;
        console.timeEnd("remove");
        // I can't seem to call delete on the cursor, but I assume it's deleted because the reference goes out of scope.
    }
    // Advances the cursor until the data equates searchTerm

    search(term: number | string): boolean{
        console.time("search");
        this.reset();
        while(true){
            let obj = this.get()!;
            if(typeof term === "string"){
                if(obj.name == term){
                    console.timeEnd("search");
                    return true;
                }
            }else{
                if(obj.id == term){
                    console.timeEnd("search");
                    return true;
                }
            }
            if(!this.step()) break;
        }
        console.timeEnd("search");
        return false;
    }
    // Sets the cursor back to the head
    reset(){
        this.cursor = this.head;
    }
}

const fullWalk = (list: LinkedList)=>{
    list.reset();
    do{
        console.log(list.get());
    }while(list.step())
}

// initialization procedures

import {faker} from "@faker-js/faker";
import { argv } from "process";
import { createInterface } from 'readline';

var stdio = createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ask = (msg:string) => new Promise<string>(resolve => 
    stdio.question(msg, response => resolve(response))
);

faker.seed(16); // fixed seed for predictability

function fakeStudent(id:number){
    return new Student(
        id,
        faker.person.fullName(),
        faker.date.birthdate({min:18, max: 65}),
        faker.location.street(),
        faker.location.city(),
        faker.location.state(),
        faker.location.zipCode(),
    )
}

var list = new LinkedList();
var nextID: number = 0;

console.time("generate database");
while(nextID < 100000){
    let s = fakeStudent(nextID);
    list.append(s);
    //console.log(`added: ${s.name}`);
    nextID++;
}
console.timeEnd("generate database");

// main functions

const main = async ()=>{
    while(true){
        await ask(`Select test operation:
1. Add student to the database
2. Delete student
3. Search by ID
4. Search by Name
5. Update record

[1-5]: `)
        .then(async (sel)=>{
            switch(sel){
                case "1":
                    await add_student();
                    break;
                case "2":
                    await delete_student();
                    break;
                case "3":
                    await search_by_id();
                    break;
                case "4":
                    await search_by_name();
                    break;
                case "5":
                    await update_record();
                    break;
                default:
                    console.error("Invalid selection.");
            }
        })
    }
}

const automatic = async()=>{
    // Adding student
    console.log("===== Adding student =====");

    let student = new Student(nextID);
    nextID++;
    student.name = "John Doe"
    student.dob = faker.date.birthdate({min:18, max: 65});
    student.address_street = faker.location.street();
    student.address_city = faker.location.city();
    student.address_state = faker.location.state();
    student.address_zip = faker.location.zipCode();
    console.log(student);
    list.append(student);

    // Deleting student 
    console.log("===== Deleting student =====");

    let id = faker.number.int({min:0, max:100000});
    list.search(id);
    student = list.get()!;
    console.log(student);
    list.remove();

    // Searching by ID
    console.log("===== Searching by ID =====");

    id = faker.number.int({min:0, max: 100000});
    list.search(id);
    student = list.get()!;
    console.log(student);

    // Searching by Name
    console.log("===== Searching by Name =====");

    list.search("John Doe");
    student = list.get()!;
    console.log(student);

    // Updating Record
    console.log("===== Updating Record =====");
    
    student.name = "John Rockefeller";
    console.log(student);

    process.exit();
}

async function add_student(){
    let student = new Student(nextID);
    nextID++;
    student.name = await ask("Name: ");
    student.dob = new Date(await ask("DOB: "));
    student.address_street = await ask("Address (Street name): ");
    student.address_city = await ask ("Address (City): ");
    student.address_state = await ask ("Address (State): ");
    student.address_zip = await ask ("Address (Zip code): ");
    
    console.log(student);
    list.append(student);
}

async function delete_student(){
    let id = Number.parseInt(await ask("Enter student ID: "));
    list.search(id);
    let student = list.get();
    console.log(student);

    let confirm = await ask("Are you sure you want to delete the above?: [y/N] ");
    if(confirm === "y"){
        list.remove();
    }else{
        console.log("No action taken.");
    }
}

async function search_by_id() {
    let id = Number.parseInt(await ask("Enter student ID: "));
    if(list.search(id)){
        let student = list.get();
        console.log(student);
    }else{
        console.log("Not found.");
    }
}

async function search_by_name(){
    let name = await ask("Enter student name: ");
    if(list.search(name)){
        let student = list.get();
        console.log(student);
    }else{
        console.log("Not found");
    }
}

async function update_record(){
    let id = Number.parseInt(await ask("Enter student ID: "));
    if(list.search(id)){
        let student = list.get()!;
        console.log(student);
        let sel = await ask(`Select field to update:

1. Name
2. Date of Birth
3. Address (Street)
4. Address (City)
5. Address (State)
6. Address (Zip)
[1-6]: `);
        
        switch(sel){
            case "1":
                student.name = await ask("Enter new name: ");
                break;
            case "2":
                student.dob = new Date(await ask("Enter new DOB: "));
                break;
            case "3":
                student.address_street = await ask("Enter new street: ");
                break;
            case "4":
                student.address_city = await ask("Enter new city: ");
                break;
            case "5":
                student.address_state = await ask("Enter new state: ");
                break;
            case "6":
                student.address_zip = await ask("Enter new zip: ");
                break;
            default:
                console.error("Invalid selection.");
        }

    }else{
        console.log("Not found.")
    }
}

if(argv.includes("--automatic")){
    automatic();
}else{
    main();
}