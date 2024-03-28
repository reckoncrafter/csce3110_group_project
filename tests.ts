import {llNode, LinkedList, fullWalk} from './main.js';

var list = new LinkedList();

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
