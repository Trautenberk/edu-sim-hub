#include "Time.hpp"

Time::Time(ContBlockEngineObj engine) : ContBlock(engine)
{}

void Time::eval() {};

double Time::value() {return engine->time();};

ContBlockObj Time::New(ContBlockEngineObj engine)
{
    return make_shared<Time>(engine);
}
