import {llNode, LinkedList, Student, fullWalk} from './ll';
import {faker} from "@faker-js/faker";
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

automatic();


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
