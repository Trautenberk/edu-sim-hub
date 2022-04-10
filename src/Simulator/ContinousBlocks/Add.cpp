#include "Add.hpp"

Add::Add(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond) : ContBlockDouble(engine, inputFirst, inputSecond)
{}

ContBlockObj Add::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Add>(engine, inputFirst, inputSecond);
}

void Add::eval()
{}

double Add::value()
{
    return inputFirst->value() + inputSecond->value();
}