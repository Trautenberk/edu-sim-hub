#include "Gain.hpp"

Gain::Gain(shared_ptr<ContBlockEngine> engine, double _gain, shared_ptr<ContBlock> input) : ContBlockSingle(engine, input), gain(_gain)
{}  


void Gain::eval()
{}

double Gain::value()
{
    return input->value() * gain;
}