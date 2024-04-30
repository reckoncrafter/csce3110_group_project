#include "bst.h"
#include "bstfaker.h"

//global variables for tree and student and tree root
Student student = Student();
BinarySearchTree bst = BinarySearchTree();
Node *root;

//populate tree with faker information
void populateTree() {
	int id;
	string name;
	pair<string, string> cS;
	string address;
	string dob;
	int zip;


	for (int i = 0; i < 100000; ++i) {
		id = Faker::genID();
		name = Faker::genFirstName();
		cS = Faker::genCityState();
		address = Faker::genStreetAddress();
		dob = Faker::genDateOfBirth();
		zip = Faker::genZipCode();
		
		student.id = id;
		student.name = name;
		student.city = cS.first;
		student.state = cS.second;
		student.dob = dob;
		student.street = address;
		student.zip = zip;

		bst.insertStudent(root, student);
    	}
}

//function to get student data from user and create Student object
void getStudent(){

    	cout << "Please enter the id of the student: " << endl;
    	cin >> student.id;
    	cin.ignore();
    	cout << "Please enter the first name of the student: " << endl;
    	getline(cin, student.name);
    	cout << "Please enter the date of birth of the student (DDMMYYYY): " << endl;
    	getline(cin, student.dob);
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

//print student infor
void printStudent(Node *s){
    	if(s != NULL){
        	cout << "ID: " << s->student.id << endl;
        	cout << "Name: " << s->student.name << endl;
        	cout << "Date of birth: " << s->student.dob << endl;
        	cout << "Address: " << s->student.street << ", " << s->student.city << ", " << s->student.state << ", " << s->student.zip << endl;
    	}
}

//user menu
void menu(){
    	int menuChoice = -1;
    	Node *foundStudent; //used in search functions
    	string studentName; //used in search by name function
    	int studentID; //used in search by id and delete functions
    	double runTime;
    	srand(time(0));
    	auto start = chrono::high_resolution_clock::now();
    	auto end = chrono::high_resolution_clock::now();;
	
	cout << "Welcome to the student database." << endl;
    	do{
        	cout << "Please enter the number of your menu choice: " << endl;
        	cout << "(1) Insert student into database" << endl;
        	cout << "(2) Search for existing student by ID" << endl;
        	cout << "(3) Search for existing student by name" << endl;
        	cout << "(4) Update existing student" << endl;
        	cout << "(5) Delete student from database" << endl;
        	cout << "(6) Exit program" << endl;

        	cin >> menuChoice;
        	cin.ignore();

        	switch (menuChoice) {
        		case 1:
            		//insert function
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
            		//search via id
            		cout << "Please enter the ID of the student: " << endl;
            		cin >> studentID;
            		cin.ignore();

            		//get runtime while performing search
            		start = chrono::high_resolution_clock::now();
            		foundStudent = bst.search(root, studentID);
            		end = chrono::high_resolution_clock::now();
		
            		runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            		runTime *= 1e-9;

            		cout << "Here are the details for the student: " << endl;
            		printStudent(foundStudent);

            		cout << "The runtime for this function was: " << runTime << endl;
            		break;
			
        		case 3:
            		//search via name
            		cout << "Please enter the name of the student: " << endl;
            		getline(cin, studentName);

            		start = chrono::high_resolution_clock::now();
            		foundStudent = bst.search(root, studentName);
            		end = chrono::high_resolution_clock::now();

            		runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            		runTime *= 1e-9;

            		cout << "Here are the details for the student: " << endl;
            		printStudent(foundStudent);

            		cout << "The runtime for this function was: " << runTime << endl;
            		break;
        
			case 4:
            		//update function
            		cout << "Please enter the ID of the student you wish to update: " << endl;
            		cin >> studentID;
            		cin.ignore();

            		start = chrono::high_resolution_clock::now();
            		foundStudent = bst.update(root, studentID);
            		end = chrono::high_resolution_clock::now();

            		runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            		runTime *= 1e-9;

            		cout << "The runtime for this function was: " << runTime << endl;

            		cout << "The updated student information is: " << endl;
            		printStudent(foundStudent);

            		cout << "The runtime for this function was: " << runTime << endl;
            		break;
        
			case 5:
           		//delete function
           		cout << "Please enter the ID of the student you wish to delete: " << endl;
            		cin >> studentID;
            		cin.ignore();

            		//get runtime while performing delete
            		start = chrono::high_resolution_clock::now();
            		foundStudent = bst.deleteStudent(root, studentID);
            		end = chrono::high_resolution_clock::now();

            		runTime = chrono::duration_cast<chrono::nanoseconds>(end-start).count();
            		runTime *= 1e-9;

            		//print runtime
            		cout << "The student has been deleted from the database." << endl;
            		cout << "The runtime for this function was: " << runTime << endl;
            		break;
        
			case 6:
            		cout << "Program terminating." << endl;
            		break; //if doing anything after calling menu() in main, change this to exit(0)
        		
			default:
            		cout << "Error: invalid choice." << endl;
            		break;
        	}

    	} while(menuChoice != 6);
}

int main(){

	populateTree();

    	menu(); //could maybe move this whole function into main

    return 0;
}
