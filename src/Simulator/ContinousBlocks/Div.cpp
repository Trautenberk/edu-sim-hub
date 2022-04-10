#include "Div.hpp"

Div::Div(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider) : ContBlockDouble(engine, value, divider) 
{}

void Div::eval()
{}

double Div::value()
{
    return inputFirst->value() / inputSecond->value();
}

ContBlockObj Div::New(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider)
{
    return make_shared<Div>(engine, value, divider);
}