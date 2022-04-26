#include "ContBlock.hpp"


////////////////////////////////////////////////////////////////////////
//// ContBlock
ContBlock::ContBlock(objectId id, ContBlockEngineObj _engine)
: ContinousSimObject(id), engine(_engine)
{}


////////////////////////////////////////////////////////////////////////
/// ContBlockSingle
ContBlockSingle::ContBlockSingle(objectId id, ContBlockEngineObj engine) 
: ContBlock(id, engine)
{}

void ContBlockSingle::setInput(ContBlockObj input)
{
    this->_input = input;
}


/////////////////////////////////////////////////////////////////////////////////
//// ContBlockDouble

ContBlockDouble::ContBlockDouble(objectId id, ContBlockEngineObj engine) 
: ContBlock(id , engine)
{}

void ContBlockDouble::setInputs(ContBlockObj inputFirst, ContBlockObj inputSecond)
{
    this->_inputFirst = inputFirst;
    this->_inputSecond = inputSecond;
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

