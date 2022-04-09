#include "Time.hpp"

Time::Time(shared_ptr<ContBlockEngine> engine) : ContBlock(engine)
{}

void Time::eval() {};
double Time::value() {return engine->time();};
