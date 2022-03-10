#include <iostream>
#include "PetriNets/Arch.hpp"
#include "PetriNets/Place.hpp"
#include "PetriNets/Transition.hpp"
#include "DiscreteSimulation/DiscreteSimulationEngine.hpp"
#include <vector>

using namespace std;

void printGeneratorOutput();

int main()
{
    cout << "Main begin..." << endl;
    auto placeOne = new Place("Place 1", 1);
    auto placeTwo = new Place("Place 2", 0);
    auto inputArch = new InputArch(placeOne);
    auto outputArch = new OutputArch(placeTwo);
    auto transition = new Transition("trans", inputArch, outputArch);

    vector<SimObject*> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();

    printGeneratorOutput();

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
    auto generator = Global::generator;

    for (int i = 0; i < 10; i++) {
        cout << "Random: " << generator->Random(50) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Uniform: " << generator->Uniform() << endl;
    }
    
    for (int i = 0; i < 10; i++) {
        cout << "Uniform(10 - 20): " << generator->Uniform(10, 20) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Exponential(1): " << generator->Exponential(1) << endl;
    }

    for (int i = 0; i < 10; i++) {
        cout << "Exponential(8): " << generator->Exponential(8) << endl;
    }


    for (int i = 0; i < 10; i++) {
        cout << "Exponential(1/8): " << generator->Exponential(1/(float)8) << endl;
    }
}