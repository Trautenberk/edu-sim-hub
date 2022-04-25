#include "Mul.hpp"

const string mulTypeName = "MulBlock";

Mul::Mul(objectId id, ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
: ContBlockDouble(id, engine, inputFirst, inputSecond)
{}

Mul::Mul(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
: Mul(SimObject::createId(mulTypeName), engine, inputFirst, inputSecond)
{}

string Mul::objTypeName()
{
    return mulTypeName;
}

void Mul::eval()
{}

double Mul::value()
{
    return inputFirst->value() * inputSecond->value();
}

ContBlockObj Mul::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    return make_shared<Mul>(engine, inputFirst, inputSecond);
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(MulBlock) {
        emscripten::class_<Mul>("Mul")
        .smart_ptr<shared_ptr<Mul>>("shared_ptr<Mul>")
        .constructor(&std::make_shared<Mul, objectId, ContBlockEngineObj, ContBlockObj, ContBlockObj>);
    }

#endif