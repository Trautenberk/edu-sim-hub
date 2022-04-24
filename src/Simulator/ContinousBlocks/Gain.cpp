#include "Gain.hpp"

const string gainTypeName = "GainBlock";

Gain::Gain(objectId id, ContBlockEngineObj engine, double _gain, ContBlockObj input)
: ContBlockSingle(id, engine, input), gain(_gain)
{}  

Gain::Gain(ContBlockEngineObj engine, double _gain, ContBlockObj input)
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
