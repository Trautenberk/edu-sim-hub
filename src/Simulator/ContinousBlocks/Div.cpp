#include "Div.hpp"

Div::Div(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> value, shared_ptr<ContBlock> divider) : ContBlockDouble(engine, value, divider) 
{}

void Div::eval()
{}

double Div::value()
{
    return inputFirst->value() / inputSecond->value();
}