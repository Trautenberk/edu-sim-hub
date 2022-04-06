#include "Sub.hpp"

Sub::Sub(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond) : ContBlockDouble(engine, inputFirst, inputSecond)
{}

void Sub::eval()
{}

double Sub::value()
{
    return inputFirst->value() - inputSecond->value();
}