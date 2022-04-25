#include "Add.hpp"

const string addTypeName = "AddBlock";

Add::Add(objectId id, ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
: ContBlockDouble(id, engine, inputFirst, inputSecond)
{}

Add::Add(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
: Add(SimObject::createId(addTypeName) ,engine, inputFirst, inputSecond)
{}

string Add::objTypeName()
{
    return addTypeName;
}

ContBlockObj Add::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Add>(engine, inputFirst, inputSecond);
}

void Add::eval()
{}

double Add::value()
{
    return inputFirst->value() + inputSecond->value();
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(AddBlock) {
        emscripten::class_<Add>("Add")
        .smart_ptr<shared_ptr<Add>>("shared_ptr<Add>")
        .constructor(&std::make_shared<Add, objectId, ContBlockEngineObj, ContBlockObj, ContBlockObj>);
    }

#endif