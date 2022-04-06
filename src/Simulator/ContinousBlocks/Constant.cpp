#include "Constant.hpp"

Constant::Constant(shared_ptr<ContBlockEngine> engine, double value) : ContBlock(engine), _value(value) 
{}

double Constant::value() 
{
    return this->_value;
}

void Constant::eval()
{}