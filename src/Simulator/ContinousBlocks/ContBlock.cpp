#include "ContBlock.hpp"

ContBlock::ContBlock(objectId id, ContBlockEngineObj _engine)
: ContinousSimObject(id), engine(_engine)
{}

ContBlockSingle::ContBlockSingle(objectId id, ContBlockEngineObj engine, ContBlockObj _input) 
: ContBlock(id, engine), input(_input) 
{}

ContBlockDouble::ContBlockDouble(objectId id, ContBlockEngineObj engine, ContBlockObj _inputFirst, ContBlockObj _inputSecond) 
: ContBlock(id, engine), inputFirst(_inputFirst), inputSecond(_inputSecond) 
{}

ContBlockMulti::ContBlockMulti(objectId id, ContBlockEngineObj engine, vector<ContBlockObj> _inputs)
: ContBlock(id, engine), inputs(_inputs)
{}
