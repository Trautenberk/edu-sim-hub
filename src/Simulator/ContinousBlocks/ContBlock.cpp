#include "ContBlock.hpp"

ContBlock::ContBlock(shared_ptr<ContBlockEngine> _engine)
: ContinousSimObject(), engine(_engine)
{}

ContBlockSingle::ContBlockSingle(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> _input) : ContBlock(engine), input(_input) 
{}

ContBlockDouble::ContBlockDouble(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> _inputFirst, shared_ptr<ContBlock> _inputSecond) 
: ContBlock(engine), inputFirst(_inputFirst), inputSecond(_inputSecond) 
{}

ContBlockMulti::ContBlockMulti(shared_ptr<ContBlockEngine> engine, vector<shared_ptr<ContBlock>> _inputs) : ContBlock(engine), inputs(_inputs)
{}
