#include "Add.hpp"

Add::Add(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond) : ContBlockDouble(engine, inputFirst, inputSecond)
{}

void Add::eval()
{}

double Add::value()
{
    return inputFirst->value() + inputSecond->value();
}