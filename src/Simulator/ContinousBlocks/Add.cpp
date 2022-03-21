#include "Add.hpp"

Add::Add(shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond) : ContBlockDouble(inputFirst, inputSecond)
{}

void Add::eval()
{}

double Add::value()
{
    return inputFirst->value() + inputSecond->value();
}