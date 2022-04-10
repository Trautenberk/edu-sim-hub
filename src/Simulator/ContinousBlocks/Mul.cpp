#include "Mul.hpp"

Mul::Mul(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond) : ContBlockDouble(engine,inputFirst, inputSecond)
{}

void Mul::eval()
{}

double Mul::value()
{
    return inputFirst->value() * inputSecond->value();
}

ContBlockObj Mul::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Mul>(engine, inputFirst, inputSecond);
}
