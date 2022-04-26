#include "Sub.hpp"

const string subTypeName = "SubBlock";

Sub::Sub(objectId id, ContBlockEngineObj engine) 
: ContBlockDouble(id, engine)
{}

string Sub::objTypeName()
{
    return subTypeName;
}

void Sub::eval()
{}

double Sub::value()
{
    return this->_inputFirst->value() - this->_inputSecond->value();
}

ContBlockObj Sub::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    auto obj = make_shared<Sub>(SimObject::createId(subTypeName), engine);
    obj->setInputs(inputFirst, inputSecond);
    return obj;
}

ContBlockObj Sub::New(ContBlockEngineObj engine)
{   
    return make_shared<Sub>(SimObject::createId(subTypeName), engine);
}



#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(SubBlock) {
        emscripten::class_<Sub>("Sub")
        .smart_ptr<shared_ptr<Sub>>("shared_ptr<Sub>")
        .constructor(&std::make_shared<Sub, objectId, ContBlockEngineObj>);
    }

#endif