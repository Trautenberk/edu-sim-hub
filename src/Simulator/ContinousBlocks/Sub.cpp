#include "Sub.hpp"

const string subTypeName = "SubBlock";

Sub::Sub(objectId id, ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond) 
: ContBlockDouble(id, engine, inputFirst, inputSecond)
{}

Sub::Sub(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
: Sub(SimObject::createId(subTypeName), engine, inputFirst, inputSecond)
{}

string Sub::objTypeName()
{
    return subTypeName;
}

void Sub::eval()
{}

double Sub::value()
{
    return inputFirst->value() - inputSecond->value();
}

ContBlockObj Sub::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Sub>(engine, inputFirst, inputSecond);
}
