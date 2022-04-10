#include "Gain.hpp"

Gain::Gain(ContBlockEngineObj engine, double _gain, ContBlockObj input) : ContBlockSingle(engine, input), gain(_gain)
{}  


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
