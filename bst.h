#ifndef BST
#define BST

#include <iostream>
#include <chrono>
#include <string>
#include <time.h>
#include <queue>
using namespace std;

class Student{
    public:
        int id;
        string name;
        string dob;
        string street;
        string city;
        string state;
        int zip;

        //default constructor
        Student(){
        }

        //constructor with arguments
        Student(int i, string n, string d, string str, string c, string sta, int z){
            id = i;
            name = n;
            dob = d;
            street = str;
            city = c;
            state = sta;
            zip = z;
        }
};

class Node{
    	public:
        	Student student;
        	Node* left;
        	Node* right;

    		//constructor
    		Node(Student s){
        	student = s;
        	left = nullptr;
        	right = nullptr;
    		}

    		//destructor 
   		~Node(){
        		if(left){
            			delete left;
        		}
        		if(right){
            			delete right;
        		}
        
    		}
};

class BinarySearchTree {
	private:
		Node* root;
	public:
		//constructor
		BinarySearchTree() {
			root = nullptr;
		}
		//destructor
		~BinarySearchTree() {
			if(root) {
				delete root;
			}
		}

		//insert new student
		void insertStudent(Node* &node, Student s) {
			if(node == nullptr){
                		node = new Node(s);
            		}
            		else if(s.id < node->student.id){
                		insertStudent(node->left, s);
            		}
            		else{
                		insertStudent(node->right, s);
            		}
        	}

		//delete student with given id
		Node* deleteStudent(Node* &node, int sID) {
			 //base case
            		if(node == NULL){
                		return node;
            		}

            		if(sID < node->student.id){
                		node->left = deleteStudent(node->left, sID);
            		}
            		else if(sID > node->student.id){
                		node->right = deleteStudent(node->right, sID);
            		}
            		else{


                	//node has one or no children
                	if(node->left == NULL){
                    		Node* temp = node->right;
                    		delete node;
                    		return temp;
                	}
                	else if(node->right == NULL){
                    		Node* temp = node->left;
                    		delete node;
                    		return temp;
                	}

                	//node has two children, get inorder successor
                	Node* temp = node->right;
                	while(temp->left != nullptr){
                   		temp = temp->left;
                	}

                	//copy temp's content to node
                	node->student.id = temp->student.id;
                	node->student.dob = temp->student.dob;
                	node->student.street = temp->student.street;
                	node->student.city = temp->student.city;
                	node->student.state = temp->student.state;
                	node->student.zip = temp->student.zip;

                	//delete inorder successor
                	node->right = deleteStudent(node->right, temp->student.id);
                	delete temp;
            		}
            	return node;
        	}
		
		//search by student id
		Node* search(Node* &node, int sID) {
			if(node == NULL || node->student.id == sID){
                	return node;
            		}
            		else if(node->student.id < sID){
                		return search(node->right, sID);
            		}
            		else{
                		return search(node->left, sID);
            		}
       		}
		
		//search student by name
		Node* search(Node* &node, string sName) {
			queue<Node*> treeQueue;

            		treeQueue.push(node);
	
            		while(!treeQueue.empty()){
                		Node* curr = treeQueue.front();

                		if (curr == nullptr || curr->student.name.compare(sName) == 0){
                    			return curr;
                		}
                		treeQueue.pop();

                		if (curr->left){
                    			treeQueue.push(curr->left);
                		}
                		if (curr->right){
                    			treeQueue.push(curr->right);
                		}
            		}
       		}

		//update student		
		Node* update(Node* &node, int sID) {
            		Node* studentToUpdate;

            		//use search function to find student
            		studentToUpdate = search(node, sID);

            		//display student information to user
            		cout << "Here is the current information for that student:" << endl;
            		printStudent(studentToUpdate);

            		//ask user what they wish to modify
            		int updateChoice = -1;
            		int newZip;

            		do{
                		cout << "Please enter the number corresponding to your choice:" << endl;
                		cout << "(1) Update name" << endl;
                		cout << "(2) Update date of birth" << endl;
                		cout << "(3) Update street" << endl;
                		cout << "(4) Update city" << endl;
                		cout << "(5) Update state" << endl;
                		cout << "(6) Update zip code" << endl;
                		cout << "(7) Exit" << endl;

                		cin >> updateChoice;
                		cin.ignore();
	
                		//perform updates based on choice
                		switch (updateChoice) {
                			case 1:
                		    	cout << "Please enter the new first name: " << endl;
                    			getline(cin, studentToUpdate->student.name);
                    			break;
                			
					case 2:
                    			cout << "Please enter the new date of birth (DDMMYYYY): " << endl;
                    			getline(cin, studentToUpdate->student.dob);
                    			break;

                			case 3:
                    			cout << "Please enter the new street address: " << endl;
                    			getline(cin, studentToUpdate->student.street);
					break;
                			
					case 4:
                    			cout << "Please enter the new city: " << endl;
                    			getline(cin, studentToUpdate->student.city);
                    			break;
                			
					case 5:
                    			cout << "Please enter the new state: " << endl;
                    			getline(cin, studentToUpdate->student.state);
                    			break;
                			
					case 6:
                    			cout << "Please enter the new zip code: " << endl;
                    			cin >> newZip;
                    			cin.ignore();
                    			studentToUpdate->student.zip = newZip;
                    			break;
                			
					case 7:
                    			cout << "Returning to main menu." << endl;
                    			break;
                			
					default:
                    			cout << "Error: invalid choice." << endl;
                    			break;
                		}

            		}while(updateChoice != 7);

            	return studentToUpdate;
       		}

		//print student info
		void printStudent(Node *s){
    			if(s != NULL){
        		cout << "ID: " << s->student.id << endl;
        		cout << "Name: " << s->student.name << endl;
        		cout << "Date of birth: " << s->student.dob << endl;
        		cout << "Address: " << s->student.street << ", " << s->student.city << ", " << s->student.state << ", " << s->student.zip << endl;
    			}
		}

};

#endif

















