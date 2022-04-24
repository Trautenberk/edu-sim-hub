#include "Time.hpp"

const string timeTypeName = "TimeBlock";

Time::Time(objectId id, ContBlockEngineObj engine) 
: ContBlock(id, engine)
{}

Time::Time(ContBlockEngineObj engine) 
: Time(SimObject::createId(timeTypeName), engine)
{}

string Time::objTypeName()
{
    return timeTypeName;
}

void Time::eval() {};

double Time::value() {return engine->time();};

ContBlockObj Time::New(ContBlockEngineObj engine)
{
    return make_shared<Time>(engine);
}
