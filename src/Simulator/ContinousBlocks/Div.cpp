#include "Div.hpp"

const string divTypeName = "DivBlock";

Div::Div(objectId id, ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider) 
: ContBlockDouble(id, engine, value, divider) 
{}

Div::Div(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider) 
: Div(SimObject::createId(divTypeName), engine, value, divider)
{} 

string Div::objTypeName()
{
    return divTypeName;
}

void Div::eval()
{}

double Div::value()
{
    return inputFirst->value() / inputSecond->value();
}

ContBlockObj Div::New(ContBlockEngineObj engine, ContBlockObj value, ContBlockObj divider)
{
    return make_shared<Div>(engine, value, divider);
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(DivBlock) {
        emscripten::class_<Div>("Div")
        .smart_ptr<shared_ptr<Div>>("shared_ptr<Div>")
        .constructor(&std::make_shared<Div, objectId, ContBlockEngineObj, ContBlockObj, ContBlockObj>);
    }

#endif