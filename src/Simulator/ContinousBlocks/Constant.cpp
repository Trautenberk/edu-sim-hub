#include "Constant.hpp"

Constant::Constant(ContBlockEngineObj engine, double value) : ContBlock(engine), _value(value) 
{}

double Constant::value() 
{
    return this->_value;
}

void Constant::eval()
{}

ContBlockObj Constant::New(ContBlockEngineObj engine, double value)
{
    return make_shared<Constant>(engine, value);
}
