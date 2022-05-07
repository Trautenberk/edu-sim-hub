#include "Add.hpp"

/**
 * @brief TypeName
 * 
 */
const string addTypeName = "AddBlock";


Add::Add(objectId id, ContBlockEngineObj engine)
: ContBlockDouble(id, engine)
{}

string Add::objTypeName()
{
    return addTypeName;
}

ContBlockObj Add::New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    auto obj = make_shared<Add>(SimObject::createId(addTypeName), engine);
    obj->setInputs(inputFirst, inputSecond);
    return obj;
}

ContBlockObj Add::New(ContBlockEngineObj engine)
{   
    return make_shared<Add>(SimObject::createId(addTypeName), engine);
}

void Add::eval()
{}

double Add::value()
{
    return this->_inputFirst->value() + this->_inputSecond->value();
}



#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(AddBlock) {
        // emscripten::class_<Add, emscripten::base<ContBlockDouble>>("Add")
        // .smart_ptr<shared_ptr<Add>>("shared_ptr<Add>")
        // .constructor(&std::make_shared<Add, objectId, ContBlockEngineObj>);
    }

#endif