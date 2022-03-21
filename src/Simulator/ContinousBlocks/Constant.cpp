#include "Constant.hpp"

Constant::Constant(double value) : ContBlock(), _value(value) 
{}



double Constant::value() 
{
    return this->_value;
}

void Constant::eval()
{}