#include "Div.hpp"

const string divTypeName = "DivBlock";

Div::Div(objectId id, ContBlockEngineObj engine) 
: ContBlockDouble(id, engine) 
{}

string Div::objTypeName()
{
    return divTypeName;
}

void Div::eval()
{}

double Div::value()
{
    return this->_inputFirst->value() / this->_inputSecond->value();
}

ContBlockObj Div::New(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider)
{
    auto obj = make_shared<Div>(SimObject::createId(divTypeName), engine);
    obj->setInputs(value, divider);
    return obj;
}


ContBlockObj Div::New(ContBlockEngineObj engine)
{
    return make_shared<Div>(SimObject::createId(divTypeName), engine);
}


