#include "Mul.hpp"

const string mulTypeName = "MulBlock";

Mul::Mul(objectId id, ContBlockEngineObj engine)
: ContBlockDouble(id, engine)
{}

string Mul::objTypeName()
{
    return mulTypeName;
}

void Mul::eval()
{}

double Mul::value()
{
    return this->_inputFirst->value() * this->_inputSecond->value();
}

ContBlockObj Mul::New(ContBlockEngineObj engine)
{
    return make_shared<Mul>(SimObject::createId(mulTypeName), engine);
}

ContBlockObj Mul::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    auto obj = make_shared<Mul>(SimObject::createId(mulTypeName), engine);
    obj->setInputs(inputFirst, inputSecond);
    return obj;
}

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(MulBlock) {
        emscripten::class_<Mul>("Mul")
        .smart_ptr<shared_ptr<Mul>>("shared_ptr<Mul>")
        .constructor(&std::make_shared<Mul, objectId, ContBlockEngineObj>);
    }

#endif