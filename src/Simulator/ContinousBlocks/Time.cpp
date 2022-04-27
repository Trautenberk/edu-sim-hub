#include "Time.hpp"

const string timeTypeName = "TimeBlock";

Time::Time(objectId id, ContBlockEngineObj engine) 
: ContBlock(id, engine)
{}

string Time::objTypeName()
{
    return timeTypeName;
}

void Time::eval() {};

double Time::value() {return engine->time();};

ContBlockObj Time::New(ContBlockEngineObj engine)
{
    return make_shared<Time>(SimObject::createId(timeTypeName), engine);
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(TimeBlock) {
        // emscripten::class_<Time>("Time")
        // .smart_ptr<shared_ptr<Time>>("shared_ptr<Time>")
        // .constructor(&std::make_shared<Time, objectId, ContBlockEngineObj>);
    }

#endif