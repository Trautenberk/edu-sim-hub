#include "Constant.hpp"

const string constantTypeName = "ConstantBlock";

Constant::Constant(objectId id, ContBlockEngineObj engine, double value) 
: ContBlock(id, engine), _value(value) 
{}

Constant::Constant(ContBlockEngineObj engine, double value)
: Constant(SimObject::createId(constantTypeName), engine, value)
{}

string Constant::objTypeName()
{
    return constantTypeName;
}

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
