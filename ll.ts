export class llNode{
    data: any;
    next: llNode | null | undefined;

    constructor(d?: any, n?: llNode | null){
        this.data = d ?? null;
        this.next = n ?? null;
    }
}

export class Student{
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

export class LinkedList{
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
    step(): boolean{
        if(this.cursor.next == null) return false; // do not step if at end of list
        this.cursor = this.cursor.next!;
        return true;
    }
    // Appends node to the end of the linked list
    append(data: any){
        if(this.head.data == null){
            this.head.data = data;
            return;
        }

        this.tail.next = new llNode(data, null);
        this.tail = this.tail.next;
    }
    // Inserts at the current cursor position
    insert(data: any){
        let n = new llNode(data, this.cursor.next);
        this.cursor.next = n;
    }
    // Removes the node at the current cursor position
    remove(){
        let temp = this.head;
        while(temp.next != this.cursor){
            if(temp.next == null) return;
            temp = temp.next!;
        }
        temp.next = this.cursor.next;
        this.cursor = temp;
        // I can't seem to call delete on the cursor, but I assume it's deleted because the reference goes out of scope.
    }
    // Advances the cursor until the data equates searchTerm
    search(searchTerm: any): boolean{
        while(this.cursor.data != searchTerm){
            if(!this.step()){
                return false;
            }
        }
        return true;
    }
    // Sets the cursor back to the head
    reset(){
        this.cursor = this.head;
    }
}

export const fullWalk = (list: LinkedList)=>{
    list.reset();
    do{
        console.log(list.get());
    }while(list.step())
}