#ifndef FAKER
#define FAKER

#include <iostream>
#include <vector>
#include <random>
#include <string>
#include <stdexcept>
#include <ctime>

using namespace std;

class Faker {
	public:
		//generate random number string
		static string generateRandomString(int length, const string& characters) {
        		static mt19937 gen(random_device{}());
        		static uniform_int_distribution<> dis(0, characters.length() - 1);

        		string result;
        		for (int i = 0; i < length; ++i) {
        			result += characters[dis(gen)];
        		}
        		
			return result;
    		}
		
		//generate random student id
    		static int genID() {
			string idStr = generateRandomString(8, "0123456789");
        		
			return stoi(idStr);
    		}

 		//Generate random city/state pair for student
		static pair<string, string> genCityState() {
			int index;
                        static const vector<string> cities = { "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Seattle", "Miami", "Orlando", "Tampa", "Austin" };
                	static mt19937 gen(random_device{}());
                	static uniform_int_distribution<> dis(0, cities.size() - 1);
                	static const vector<string> states = { "New York", "California", "Illinois", "Texas", "Arizona", "Pennsylvania", "Texas", "California", "Texas", "California", "Washington", "Florida", "Florida", "Florida", "Texas" };

			index = dis(gen);
                	pair<string, string> cityState = make_pair(cities[index], states[index]);
                	
			return cityState;
                }

		//generate random street address
    		static string genStreetAddress() {
        		static const vector<string> streets = { "Main Street", "3rd Street", "4th Street", "5th Street", "6th Street", "Sesame Street", "Park Avenue", "Washington Avenue", "Jefferson Boulevard", "Shady Oaks Drive", "West University Drive"};
        		static mt19937 gen(random_device{}());
        		static uniform_int_distribution<> dis(0, streets.size() - 1);

        		return to_string(dis(gen)) + " " + streets[dis(gen)];
    		}

		//generate random first name
    		static string genFirstName() {
        		static const vector<string> firstNames = { "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Matthew", "Mark", "Cora", "Libby", "Alexandra", "Elise", "April", "Hazel", "Dana", "Mya", "Heather", "Kathrine", "Kayla", "Kylie", "Ashley", "Sean"};
        		static mt19937 gen(random_device{}());
        		static uniform_int_distribution<> dis(0, firstNames.size() - 1);
	
        		return firstNames[dis(gen)];
    		}

    		//generate random dob for student
		static string genDateOfBirth() {
        		static mt19937 gen(random_device{}());
        		uniform_int_distribution<> disDay(1, 28);  
        		uniform_int_distribution<> disMonth(1, 12);
        		uniform_int_distribution<> disYear(1990, 2004);

        		int day = disDay(gen);
        		int month = disMonth(gen);
        		int year = disYear(gen);

        		char buffer[11];
			// we used "sprintf" for the CELL machines but you can use "sprintf_s" if there is an error
        		sprintf(buffer, "%02d%02d%d", day, month, year); 
        		return string(buffer);
    		}

		//generate random zip code
    		static int genZipCode() {
        		static mt19937 gen(random_device{}());
        		uniform_int_distribution<> dis(10000, 99999);
        		return stoi(to_string(dis(gen)));
    		}
};

#endif
