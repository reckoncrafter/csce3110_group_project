import {llNode, LinkedList, Student, fullWalk} from './ll.ts';
import {faker} from "@faker-js/faker";

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

{ // test block: create student roster
    for(let i = 0; i < 100; i++){
        let s = fakeStudent(i);
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
    fullWalk(list);
}

{ // passed test block: insertion
    console.log("-------");
    list.reset();
    list.step();
    list.insert('5!');
    fullWalk(list);
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
    fullWalk(list);
}
