#include "Mul.hpp"

Mul::Mul(shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond) : ContBlockDouble(inputFirst, inputSecond)
{}

void Mul::eval()
{}

double Mul::value()
{
    return inputFirst->value() * inputSecond->value();
}