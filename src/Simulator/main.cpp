#include <iostream>
#include "PetriNets/Arch.hpp"
#include "PetriNets/Place.hpp"
#include "PetriNets/Transition.hpp"
#include "DiscreteSimulation/DiscreteEngine.hpp"
#include <vector>
#include "DiscreteSimulation/Calendar.hpp"
#include "Generator/Generator.hpp"

using namespace std;
template <typename T> using SP = std::shared_ptr<T>;
template <typename T> using vec = std::vector<T>;


void printGeneratorOutput();
void testGenerator();
void testPriorityEvent();



int main()
{
    cout << "Main begin..." << endl;

    cout << "Main end..." << endl;
}


void printGeneratorOutput() {
    cout << "Random number generation:" << endl;
    auto generator = Generator();

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
    auto func = [](int eventId){return;};
    auto calendar = Calendar();
    auto eventOne = Event(0,func);
    auto eventTwo = Event(0,func, 2);
    auto eventThree = Event(0,func,1);

    calendar.insertEvent(eventOne);
    calendar.insertEvent(eventTwo);
    calendar.insertEvent(eventThree);
}



void testGenerator()
{
    auto engine = shared_ptr<PetriNetsEngine> (new PetriNetsEngine());
    auto placeOne = shared_ptr<Place>(new Place(engine, "Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place(engine, "Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(engine, placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(engine, placeTwo));
    auto rekurseArch = shared_ptr<OutputArch>(new OutputArch(engine, placeOne));

    vector<shared_ptr<InputArch>> inputArches = {inputArch}; 
    vector<shared_ptr<OutputArch>> outputArches = {outputArch, rekurseArch};
    
    auto transition = shared_ptr<Transition>(new TimedTransition(engine, "Transition 1", inputArches, outputArches, 5));

    // vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, rekurseArch, transition};
    // auto engine = DiscreteEngine();
    // engine.allTransitions = {transition};

    // cout << "Initializing..." << endl;
    // engine.init(30, objects);
    // cout << "Begin simulation..." << endl;
    // engine.simulate();
    // cout << "Simulation end at "<< engine.time << "..." << endl;
}
