#include "ContBlock.hpp"
#include <iostream>

////////////////////////////////////////////////////////////////////////
//// ContBlock
ContBlock::ContBlock(objectId id, ContBlockEngineObj _engine)
: SimObject(id), engine(_engine)
{
    engine->addObject(this);
}

void ContBlock::initialize()
{
    return;
}

////////////////////////////////////////////////////////////////////////
/// ContBlockSingle
ContBlockSingle::ContBlockSingle(objectId id, ContBlockEngineObj engine) 
: ContBlock(id, engine)
{}

void ContBlockSingle::initialize()
{
    if (this->_input == nullptr) {
        std::cerr << "Error: uninitialized input in block " << this->id() << std::endl;
        throw new exception();
    }
}

void ContBlockSingle::setInput(ContBlockObj input)
{
    this->_input = input;
}


/////////////////////////////////////////////////////////////////////////////////
//// ContBlockDouble

ContBlockDouble::ContBlockDouble(objectId id, ContBlockEngineObj engine) 
: ContBlock(id , engine)
{
}


void ContBlockDouble::setInputs(ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    this->_inputFirst = inputFirst;
    this->_inputSecond = inputSecond;
}

void ContBlockDouble::setInputFirst(ContBlockObj inputFirst)
{
    this->_inputFirst = inputFirst;
}

void ContBlockDouble::setInputSecond(ContBlockObj inputSecond)
{
    this->_inputSecond = inputSecond;
}

void ContBlockDouble::initialize()
{
    if (this->_inputFirst == nullptr || this->_inputSecond == nullptr) {
        std::cerr << "Error: uninitialized first or second input in block " << this->id() << std::endl;
        throw  exception();
    }
}

/////////////////////////////////////////////////////////////////////////////////
//// ContBlockMulti

ContBlockMulti::ContBlockMulti(objectId id, ContBlockEngineObj engine)
: ContBlock(id, engine)
{}

void ContBlockMulti::setInputs(std::vector<ContBlockObj> inputs)
{
    this->_inputs =inputs;
}


// #ifdef EMSCRIPTEN
//     EMSCRIPTEN_BINDINGS(ContBlock) {
//         // emscripten::class_<ContBlock>("ContBlock");

//         // emscripten::class_<ContBlockSingle>("ContBlockSingle")
//         // .function("setInput", &ContBlockSingle::setInput)
//         // ;

//         // emscripten::class_<ContBlockDouble>("ContBlockDouble")
//         // .function("setInputs", &ContBlockDouble::setInputs)
//         // ;
//     }
// #endif
