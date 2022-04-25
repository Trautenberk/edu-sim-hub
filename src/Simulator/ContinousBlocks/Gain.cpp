#include "Gain.hpp"

const string gainTypeName = "GainBlock";

Gain::Gain(objectId id, ContBlockEngineObj engine, double _gain, ContBlockObj input)
: ContBlockSingle(id, engine, input), gain(_gain)
{}  

Gain::Gain(ContBlockEngineObj engine, double gain, ContBlockObj input)
: Gain(SimObject::createId(gainTypeName), engine, gain, input)
{}

string Gain::objTypeName()
{
    return gainTypeName;
}

void Gain::eval()
{}

double Gain::value()
{
    return input->value() * gain;
}

ContBlockObj Gain::New(ContBlockEngineObj engine, double gain, ContBlockObj input)
{
    return make_shared<Gain>(engine, gain, input);
}        


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(GainBlock) {
        emscripten::class_<Gain>("Gain")
        .smart_ptr<shared_ptr<Gain>>("shared_ptr<Gain>")
        .constructor(&std::make_shared<Gain, objectId, ContBlockEngineObj, double, ContBlockObj>);
    }

#endif