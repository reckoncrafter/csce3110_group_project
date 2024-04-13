/*
@author Katherine Gash
@date Spring 2024
@course CSCE 3110.001

This is the implementation file for the Binary Search Tree portion of the group project for this course.
A faker is used to generate a list of students, each with a dataset. These students can be added to, 
deleted from, searched for, and updated within the tree. Deleting, searching, and updating can be done
with the student's ID. Searching can also be done with the student's name. A student's ID cannot be 
updated.
The run time of each operation is found in the comment above that respective operation.


@todo
    fix delete function
    add overloaded search functions
    add update function
    incorporate faker
    add runtimes
*/

#include <iostream>
#include <chrono>
#include <time.h>
using namespace std;

//#include "bst.hpp"

class Student{
    public:
        int id;
        string name;
        int dob;
        string street;
        string city;
        string state;
        int zip;

        //default constructor
        Student(){
        }

        //constructor with arguments
        Student(int i, string n, int d, string str, string c, string sta, int z){
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

    //destructor ---- don't know if this should be included
    // ~Node(){
    //     if(left){
    //         delete left;
    //     }
    //     if(right){
    //         delete right;
    //     }
    // }
};

class BinarySearchTree{
    private:
        Node* root;
    public:
        //constructor
        BinarySearchTree(){
            Node* root = nullptr;
        }

        //destructor ---- don't know if this should be included
        // ~BinarySearchTree(){
        //     if(root){
        //         delete root;
        //     }
        // }

        /*
        * insert
        *
        * Runtime:
        */

        void insertStudent(Node* &node, Student s){
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

        /*
        * delete
        *
        * @todo Add code so it's fine to delete root - right now it's not
        * 
        * Runtime:
        */
       Node* deleteStudent(Node* &node, int sID){
            //base case
            if(node == nullptr){
                return nullptr;
            }
            
            if(sID < node->student.id){
                node->left = deleteStudent(node->left, sID);
                return node;
            }
            else if(sID > node->student.id){
                node->right = deleteStudent(node->right, sID);
                return node;
            }
            else{
                //node has one or no children
                if(node->left == nullptr){
                    Node* temp = node->right;
                    delete node;
                    return temp;
                }
                else if(node->right == nullptr){
                    Node* temp = node->left;
                    delete node;
                    return temp;
                }
                //node has two children, get inorder successor
                Node* parent = node;
                Node*temp = node->right;
                while(temp->left != nullptr){
                    parent = temp;
                    temp = temp->left;
                }
                //delete inorder successor
                if(parent != node){
                    parent->left = parent->right;
                }
                else{
                    parent->right = temp->right;
                }

                //copy data from inorder successor
                node->student = temp->student;
                //delete inorder successor
                delete temp;
            }
            return node;
        }



        /*
        * search via id
        *
        * Runtime:
        */



        /*
        * search via name
        *
        * Runtime:
        */



        /*
        * update
        *
        * Runtime:
        */
};

Student student = Student();
BinarySearchTree bst = BinarySearchTree();
Node *root;

//function to get student data from user and create Student object
void getStudent(){

    cout << "Please enter the id of the student: " << endl;
    cin >> student.id;
    cin.ignore();
    cout << "Please enter the first name of the student: " << endl;
    getline(cin, student.name);
    cout << "Please enter the date of birth of the student (DDMMYYY): " << endl;
    cin >> student.dob;
    cin.ignore();
    cout << "Please enter the street of the student's address: " << endl;
    getline(cin, student.street);
    cout << "Please enter the city of the student's address: " << endl;
    getline(cin, student.city);
    cout << "Please enter the state of the student's address: " << endl;
    getline(cin, student.state);
    cout << "Please enter the zip code of the student's address: " << endl;
    cin >> student.zip;
    cin.ignore();    
}

//user menu
void menu(){
    int menuChoice = -1;
    double runTime;
    srand(time(0));
    auto start = chrono::high_resolution_clock::now();
    auto end = chrono::high_resolution_clock::now();;

    cout << "Welcome to the student database." << endl;
    do{
        cout << "Please enter the number of your menu choice: " << endl;
        cout << "(1) Insert student into database" << endl;
        cout << "(2) Search for existing student" << endl;
        cout << "(3) Update existing student" << endl;
        cout << "(4) Delete student from database" << endl;
        cout << "(5) Exit program" << endl;

        cin >> menuChoice;
        cin.ignore();

        switch (menuChoice)
        {
        case 1:
            /*insert function*/
            getStudent();

            //get runtime while performing insert
            start = chrono::high_resolution_clock::now();
            bst.insertStudent(root, student);
            end = chrono::high_resolution_clock::now();

            runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            runTime *= 1e-9;

            //print runtime
            cout << "The student has been added to the database." << endl;
            cout << "The runtime for this function was: " << runTime << endl;
            break;
        case 2:
            //search function - overloaded
            break;
        case 3:
            //update function
            break;
        case 4:
            //delete function
            cout << "Please enter the ID of the student you wish to delete: " << endl;
            int studentID;
            cin >> studentID;
            cin.ignore();

            //get runtime while performing delete
            start = chrono::high_resolution_clock::now();
            bst.deleteStudent(root, studentID);
            end = chrono::high_resolution_clock::now();

            runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            runTime *= 1e-9;

            //print runtime
            cout << "The student has been deleted from the database." << endl;
            cout << "The runtime for this function was: " << runTime << endl;
            break;
        case 5:
            cout << "Program terminating." << endl;
            break; //if doing anything after calling menu() in main, change this to exit(0)
        default:
            cout << "Error: invalid choice." << endl;
            break;
        }

    } while(menuChoice != 5);
}

//print bst inorder traversal (for debugging, delete later)
void print(Node* n){
    if(n != nullptr){
        print(n->left);

        cout << "ID: " << n->student.id << "\n Name: " << n->student.name << endl;

        print(n->right);
    }
}

int main(){

    menu();

    print(root); //remove along with function definition when done debugging

    return 0;
}