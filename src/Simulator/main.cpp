#include <iostream>
#include "PetriNets/Arch.hpp"
#include "PetriNets/Place.hpp"
#include "PetriNets/Transition.hpp"
#include "DiscreteSimulation/DiscreteEngine.hpp"
#include "ContinousSimulation/ContinousSimEngine.hpp"
#include <vector>
#include "DiscreteSimulation/Calendar.hpp"
#include "Generator/Generator.hpp"
#include "ContinousBlocks/Add.hpp"
#include "ContinousBlocks/Constant.hpp"
#include "ContinousBlocks/Div.hpp"
#include "ContinousBlocks/Gain.hpp"
#include "ContinousBlocks/Mul.hpp"
#include "ContinousBlocks/Integrator.hpp"
#include "ContinousBlocks/Sub.hpp"
#include "ContinousBlocks/Sum.hpp"
#include "ContinousBlocks/Time.hpp"

#include "ContinousBlocks/ContBlockEngine.hpp"
#include "IntegrationMethods/IntegrationMethods.hpp"
#include <functional>

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    using namespace emscripten;
#endif


using namespace std;

template <typename T> using SP = std::shared_ptr<T>;
template <typename T> using vec = std::vector<T>;



void testGenerator();
// void contBlocksSandBox();


// void hello() {
//     cout << "Hello from wasm!!" << endl;
// }

int main()
{
    cout << "Main begin..." << endl;
    testGenerator();
    // contBlocksSandBox();
    cout << "Main end..." << endl;
}





void testGenerator()
{
    auto test = ContBlockEngine::New(IntegrationMethods::Euler);
    auto add = Add("aaa", test);


    auto engine = PetriNetsEngine::New();
    // auto placeOne = Place::New(engine, "Place 1", 1);
    // auto placeTwo = Place::New(engine, "Place 2", 0);
    // auto inputArch = InputArch::New(engine, placeOne);
    // auto outputArch = OutputArch::New(engine, placeTwo);
    // auto rekurseArch = OutputArch::New(engine, placeOne);

    // vector<InputArchObj> inputArches = {inputArch};
    // vector<OutputArchObj> outputArches = {outputArch, rekurseArch};

    // auto transition = TimedConstantTransition::New(engine, "Transition 1", inputArches, outputArches, 5);

    // vector<shared_ptr<SimObject>> objects = {placeOne, placeTwo, inputArch, outputArch, rekurseArch, transition};
    // auto engine = DiscreteEngine();
    // engine.allTransitions = {transition};

    // cout << "Initializing..." << endl;
    // engine.init(30, objects);
    // cout << "Begin simulation..." << endl;
    // engine.simulate();
    // cout << "Simulation end at "<< engine.time << "..." << endl;
}

void contBlocksSandBox()
{
    // auto engine = ContBlockEngine::New(IntegrationMethods::Euler);

    // auto constantOne = Constant::New(engine, 1.0);
    // auto constantTwo = Constant::New(engine, 2.0);
    // vector<ContBlockObj> inputs = {constantOne, constantTwo};

    // auto add = Add::New(engine, constantOne, constantTwo);
    // auto sub = Sub::New(engine, constantOne, constantTwo);
    // auto div = Div::New(engine, constantOne, constantTwo);
    // auto mul = Mul::New(engine, constantOne, constantTwo);
    // auto gain = Gain::New(engine, 1, constantOne);
    // // auto integrator = Integrator();
    // auto sum = Sum::New(engine, inputs);
}



#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(main) {
        emscripten::class_<ContBlock>("ContBlock")
        .smart_ptr<shared_ptr<ContBlock>>("shared_ptr<ContBlock>");

        emscripten::class_<ContBlockSingle, emscripten::base<ContBlock>>("ContBlockSingle")
        .smart_ptr<shared_ptr<ContBlockSingle>>("shared_ptr<ContBlockSingle>")
        .function("setInput", &ContBlockSingle::setInput)
        ;

        emscripten::class_<ContBlockDouble, emscripten::base<ContBlock>>("ContBlockDouble")
        .smart_ptr<shared_ptr<ContBlockDouble>>("shared_ptr<ContBlockDouble>")
        .function("setInputFirst", &ContBlockDouble::setInputFirst)
        .function("setInputSecond", &ContBlockDouble::setInputSecond)
        ;


        emscripten::class_<Add, emscripten::base<ContBlockDouble>>("Add")
        .smart_ptr<shared_ptr<Add>>("shared_ptr<Add>")
        .constructor(&std::make_shared<Add, objectId, ContBlockEngineObj>);

        emscripten::class_<Mul, emscripten::base<ContBlockDouble>>("Mul")
        .smart_ptr<shared_ptr<Mul>>("shared_ptr<Mul>")
        .constructor(&std::make_shared<Mul, objectId, ContBlockEngineObj>);

        emscripten::class_<Sub, emscripten::base<ContBlockDouble>>("Sub")
        .smart_ptr<shared_ptr<Sub>>("shared_ptr<Sub>")
        .constructor(&std::make_shared<Sub, objectId, ContBlockEngineObj>);

        emscripten::class_<Div, emscripten::base<ContBlockDouble>>("Div")
        .smart_ptr<shared_ptr<Div>>("shared_ptr<Div>")
        .constructor(&std::make_shared<Div, objectId, ContBlockEngineObj>);

        emscripten::class_<Integrator, emscripten::base<ContBlockSingle>>("Integrator")
        .smart_ptr<shared_ptr<Integrator>>("shared_ptr<Integrator>")
        .constructor(&std::make_shared<Integrator, objectId, ContBlockEngineObj, double>);

        emscripten::class_<Constant, emscripten::base<ContBlock>>("Constant")
        .smart_ptr<shared_ptr<Constant>>("shared_ptr<Constant>")
        .constructor(&std::make_shared<Constant, objectId, ContBlockEngineObj, double>);

        emscripten::class_<Time, emscripten::base<ContBlock>>("Time")
        .smart_ptr<shared_ptr<Time>>("shared_ptr<Time>")
        .constructor(&std::make_shared<Time, objectId, ContBlockEngineObj>);


        emscripten::class_<Gain, emscripten::base<ContBlockSingle>>("Gain")
        .smart_ptr<shared_ptr<Gain>>("shared_ptr<Gain>")
        .constructor(&std::make_shared<Gain, objectId, ContBlockEngineObj, double>);
    }
#endif




