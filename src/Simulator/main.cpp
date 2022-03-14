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
void testImmediateTransition();
void testTimedTransition();
void testGenerator();
void testInputWeightArch();
void testOutputWeightArch();
void testImmediateAndTimedTransition();
void testImmediateAndTimedTransitionTwo();



int main()
{
    cout << "Main begin..." << endl;

    // printGeneratorOutput();
    // testPriorityEvent();
    // testImmediateTransition();
    // testTimedTransition();
    // testGenerator();
    // testInputWeightArch();
    // testOutputWeightArch();
    // testImmediateAndTimedTransition();
    testImmediateAndTimedTransitionTwo();
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
    auto func = [](int eventId){return;};
    auto calendar = Calendar();
    auto eventOne = Event(0,func);
    auto eventTwo = Event(0,func, 2);
    auto eventThree = Event(0,func,1);

    calendar.insertEvent(eventOne);
    calendar.insertEvent(eventTwo);
    calendar.insertEvent(eventThree);
}


void testImmediateTransition()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo));

    auto transition = shared_ptr<Transition>(new ImmediateTransition("Transition 1", inputArch, outputArch));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {transition};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end..." << endl;
}

void testTimedTransition()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo));

    auto transition = shared_ptr<Transition>(new TimedTransition("Transition 1", inputArch, outputArch, 5));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {transition};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;
}

void testGenerator()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo));
    auto rekurseArch = shared_ptr<OutputArch>(new OutputArch(placeOne));

    vector<shared_ptr<InputArch>> inputArches = {inputArch}; 
    vector<shared_ptr<OutputArch>> outputArches = {outputArch, rekurseArch};
    
    auto transition = shared_ptr<Transition>(new TimedTransition("Transition 1", inputArches, outputArches, 5));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, rekurseArch, transition};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {transition};

    cout << "Initializing..." << endl;
    engine.init(30, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;
}

void testInputWeightArch()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 3));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne, 2));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo));

    auto transition = shared_ptr<Transition>(new TimedTransition("Transition 1", inputArch, outputArch, 5));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {transition};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;

}

void testOutputWeightArch()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto inputArch = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputArch = shared_ptr<OutputArch>(new OutputArch(placeTwo, 5));

    auto transition = shared_ptr<Transition>(new TimedTransition("Transition 1", inputArch, outputArch, 5));

    vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, transition};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {transition};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;
}

void testImmediateAndTimedTransition()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 1));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 0));
    auto placeThree = shared_ptr<Place>(new Place("Place 3", 0));

    auto inputImmediate = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputImmediate = shared_ptr<OutputArch>(new OutputArch(placeTwo));

    auto inputTimed = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputTimed = shared_ptr<OutputArch>(new OutputArch(placeThree));

    auto immediate = shared_ptr<Transition>(new ImmediateTransition("Immediate 1", inputImmediate, outputImmediate));
    auto timed = shared_ptr<Transition>(new TimedTransition("Timed 1", inputTimed, outputTimed, 5));


    vector<shared_ptr<SimObject>> objects = {immediate, timed};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {immediate, timed};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;
}

void testImmediateAndTimedTransitionTwo()
{
    auto placeOne = shared_ptr<Place>(new Place("Place 1", 5));
    auto placeTwo = shared_ptr<Place>(new Place("Place 2", 2));
    auto placeThree = shared_ptr<Place>(new Place("Place 3", 0));
    auto placeFour = shared_ptr<Place>(new Place("Place 4", 0));

    auto inputImmediate = shared_ptr<InputArch>(new InputArch(placeOne));
    auto inputImmediateTwo = shared_ptr<InputArch>(new InputArch(placeTwo));
    auto outputImmediate = shared_ptr<OutputArch>(new OutputArch(placeThree));

    auto inputTimed = shared_ptr<InputArch>(new InputArch(placeOne));
    auto outputTimed = shared_ptr<OutputArch>(new OutputArch(placeFour));

    vector<shared_ptr<InputArch>> immediateInputs = {inputImmediate, inputImmediateTwo};
    vector<shared_ptr<OutputArch>> immediateOutputs = {outputImmediate};

    auto immediate = shared_ptr<Transition>(new ImmediateTransition("Immediate 1", immediateInputs, immediateOutputs));
    auto timed = shared_ptr<Transition>(new TimedTransition("Timed 1", inputTimed, outputTimed, 5));


    vector<shared_ptr<SimObject>> objects = {immediate, timed};
    auto engine = DiscreteSimulationEngine();
    engine.allTransitions = {immediate, timed};

    cout << "Initializing..." << endl;
    engine.init(10, objects);
    cout << "Begin simulation..." << endl;
    engine.simulate();
    cout << "Simulation end at "<< engine.time << "..." << endl;
}