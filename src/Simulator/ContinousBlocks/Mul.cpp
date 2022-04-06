#include "Mul.hpp"

Mul::Mul(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond) : ContBlockDouble(engine,inputFirst, inputSecond)
{}

void Mul::eval()
{}

double Mul::value()
{
    return inputFirst->value() * inputSecond->value();
}