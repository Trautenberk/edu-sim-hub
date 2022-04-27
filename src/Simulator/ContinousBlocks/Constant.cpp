#include "Constant.hpp"

const string constantTypeName = "ConstantBlock";

Constant::Constant(objectId id, ContBlockEngineObj engine, double value) 
: ContBlock(id, engine), _value(value) 
{}

string Constant::objTypeName()
{
    return constantTypeName;
}

double Constant::value() 
{
    return this->_value;
}

void Constant::eval()
{}

ContBlockObj Constant::New(ContBlockEngineObj engine, double value)
{
    return make_shared<Constant>(SimObject::createId(constantTypeName), engine, value);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(ConstantBlock) {
        // emscripten::class_<Constant>("Constant")
        // .smart_ptr<shared_ptr<Constant>>("shared_ptr<Constant>")
        // .constructor(&std::make_shared<Constant, objectId, ContBlockEngineObj, double>);
    }
#endif