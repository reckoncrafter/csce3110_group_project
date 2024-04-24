#include <iostream>
#include <vector>
#include <random>
#include <string>
#include <ctime>

using namespace std;

class Faker {
public:
    static string generateRandomString(int length, const string& characters) {
        static mt19937 gen(random_device{}());
        static uniform_int_distribution<> dis(0, characters.length() - 1);

        string result;
        for (int i = 0; i < length; ++i) {
            result += characters[dis(gen)];
        }
        return result;
    }

    static string genID() {
        return generateRandomString(8, "0123456789");
    }

    static string genCity() {
        static const vector<string> cities = { "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Seattle", "Miami", "Orlando", "Tampa", "Austin" };
        static mt19937 gen(random_device{}());
        static uniform_int_distribution<> dis(0, cities.size() - 1);

        return cities[dis(gen)];
    }

    static string genState() {
        static const vector<string> states = { "New York", "California", "Washington", "Texas", "Arizona", "Pennsylvania", "Florida", "Maine", "Colorado", "San Jose", "North Carolina" };
        static mt19937 gen(random_device{}());
        static uniform_int_distribution<> dis(0, states.size() - 1);

        return states[dis(gen)];
    }

    static string genStreetAddress() {
        static const vector<string> streets = { "Main Street", "3rd Street", "4th Street", "5th Street", "6th Street", "Sesame Street", "Park Avenue", "Washington Avenue", "Jefferson Boulevard", "Shady Oaks Drive", "West University Drive"};
        static mt19937 gen(random_device{}());
        static uniform_int_distribution<> dis(0, streets.size() - 1);

        return to_string(dis(gen)) + " " + streets[dis(gen)];
    }

    static string genFirstName() {
        static const vector<string> firstNames = { "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Matthew", "Mark", "Cora", "Libby", "Alexandra", "Elise", "April", "Hazel", "Dana", "Mya", "Heather", "Kathrine", "Kayla", "Kylie", "Ashley", "Sean"};
        static mt19937 gen(random_device{}());
        static uniform_int_distribution<> dis(0, firstNames.size() - 1);

        return firstNames[dis(gen)];
    }

    static string genDateOfBirth() {
        static mt19937 gen(random_device{}());
        uniform_int_distribution<> disDay(1, 28);  // Simplified range
        uniform_int_distribution<> disMonth(1, 12);
        uniform_int_distribution<> disYear(1990, 2004);

        int day = disDay(gen);
        int month = disMonth(gen);
        int year = disYear(gen);

        char buffer[11];
        sprintf_s(buffer, "%02d%02d%d", day, month, year);
        return string(buffer);
    }

    static string genZipCode() {
        static mt19937 gen(random_device{}());
        uniform_int_distribution<> dis(10000, 99999);
        return to_string(dis(gen));
    }
};

int main() {
    vector<string> ids;
    vector<string> cities;
    vector<string> streetAddresses;
    vector<string> firstNames;
    vector<string> dateOfBirths;
    vector<string> zipCodes;
    vector<string> states;

    for (int i = 0; i < 100000; ++i) {
        ids.push_back(Faker::genID());
        cities.push_back(Faker::genCity());
        states.push_back(Faker::genState());
        streetAddresses.push_back(Faker::genStreetAddress());
        firstNames.push_back(Faker::genFirstName());
        dateOfBirths.push_back(Faker::genDateOfBirth());
        zipCodes.push_back(Faker::genZipCode());
    }

    // Print the details of the first 7 students
    for (int i = 0; i < 7; ++i) {
        cout << "Student " << i + 1 << " Details:" << endl;
        cout << "ID: " << ids[i] << endl;
        cout << "City: " << cities[i] << endl;
        cout << "State: " << states[i] << endl;
        cout << "Street Address: " << streetAddresses[i] << endl;
        cout << "First Name: " << firstNames[i] << endl;
        cout << "Date of Birth: " << dateOfBirths[i] << endl;
        cout << "Zip Code: " << zipCodes[i] << endl << endl;
    }

    return 0;
}
