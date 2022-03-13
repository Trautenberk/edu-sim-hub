#include <iostream>
#include "PetriNets/Arch.hpp"
#include "PetriNets/Place.hpp"
#include "PetriNets/Transition.hpp"
#include "DiscreteSimulation/DiscreteSimulationEngine.hpp"
#include <vector>
#include "DiscreteSimulation/Calendar.hpp"

using namespace std;

void printGeneratorOutput();
void testPriorityEvent();

int main()
{
    cout << "Main begin..." << endl;
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo));

    auto transition = shared_ptr<Transition>(new Transition("Transition 1", inputArch, outputArch));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();

    // printGeneratorOutput();
    // testPriorityEvent();

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Initialization completed..." << endl;
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation finished..." << endl;
    cout << "Main end..." << endl;
}


void printGeneratorOutput() {
    cout << "Random number generation:" << endl;
    auto& generator = Global::discreteSimEngine->generator;

    for (int i = 0; i < 10; i++) {
        cout << "Random: " << generator.Random(50) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Uniform: " << generator.Uniform() << endl;
    }
    
    for (int i = 0; i < 10; i++) {
        cout << "Uniform(10 - 20): " << generator.Uniform(10, 20) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Exponential(1): " << generator.Exponential(1) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Exponential(8): " << generator.Exponential(8) << endl;
    }


    for (int i = 0; i < 10; i++) {
        cout << "Exponential(1/8): " << generator.Exponential(1/(float)8) << endl;
    }
}


void testPriorityEvent()
{
    auto func = [](){return;};
    auto calendar = Calendar();
    auto eventOne = Event(0,func);
    auto eventTwo = Event(0,func, 2);
    auto eventThree = Event(0,func,1);


    calendar.insertEvent(eventOne);
    calendar.insertEvent(eventTwo);
    calendar.insertEvent(eventThree);

}