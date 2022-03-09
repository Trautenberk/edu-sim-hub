#include <iostream>
#include "PetriNets/Arch.hpp"
#include "PetriNets/Place.hpp"
#include "PetriNets/Transition.hpp"
#include "DiscreteSimulation/DiscreteSimulationEngine.hpp"
#include <vector>

using namespace std;

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
    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Initialization completed..." << endl;
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation finished..." << endl;
    cout << "Main end..." << endl;
}
