#include "Sub.hpp"

Sub::Sub(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond) : ContBlockDouble(engine, inputFirst, inputSecond)
{}

void Sub::eval()
{}

double Sub::value()
{
    return inputFirst->value() - inputSecond->value();
}

ContBlockObj Sub::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Sub>(engine, inputFirst, inputSecond);
}
