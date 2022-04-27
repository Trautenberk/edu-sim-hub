#include "Gain.hpp"

const string gainTypeName = "GainBlock";

Gain::Gain(objectId id, ContBlockEngineObj engine, double gain)
: ContBlockSingle(id, engine), _gain(gain)
{}  

string Gain::objTypeName()
{
    return gainTypeName;
}

void Gain::eval()
{}

double Gain::value()
{
    return this->_input->value() * this->_gain;
}

ContBlockObj Gain::New(ContBlockEngineObj engine, double gain)
{
    return make_shared<Gain>(SimObject::createId(gainTypeName), engine, gain);
}        


ContBlockObj Gain::New(ContBlockEngineObj engine, double gain, ContBlockObj input)
{
    auto obj = make_shared<Gain>(SimObject::createId(gainTypeName), engine, gain);
    obj->setInput(input);
    return obj;
}

// #ifdef EMSCRIPTEN
//     #include <emscripten/bind.h>
//     EMSCRIPTEN_BINDINGS(GainBlock) {
//         // emscripten::class_<Gain>("Gain")
//         // .smart_ptr<shared_ptr<Gain>>("shared_ptr<Gain>")
//         // .constructor(&std::make_shared<Gain, objectId, ContBlockEngineObj, double>)
//         ;
//     }
// #endif