#include "Gain.hpp"

Gain::Gain(double _gain, shared_ptr<ContBlock> input) : ContBlockSingle(input), gain(_gain)
{}  


void Gain::eval()
{}

double Gain::value()
{}