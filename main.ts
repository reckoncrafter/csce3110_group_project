class llNode{
    data: any;
    next: llNode | null;

    constructor();
    constructor(d?: any, n?: llNode){
        this.data = d ?? null;
        this.next = n ?? null;
    }
}

class LinkedList{
    // This is a singly linked list
    head: llNode;
    cursor: llNode;
    
    constructor(){
        this.head = new llNode();
        this.cursor = this.head; // Objects are passed by reference
    }

    // Returns the current item
    get(){
        return this.cursor;
    }
    // Advances the cursor
    step(){
        if(this.cursor.next == null) return; // do not step if at end of list
        this.cursor = this.cursor.next!;
    }
}