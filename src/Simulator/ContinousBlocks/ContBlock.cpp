#include "ContBlock.hpp"

ContBlockSingle::ContBlockSingle(shared_ptr<ContBlock> _input) : ContBlock(), input(_input) 
{}

ContBlockDouble::ContBlockDouble(shared_ptr<ContBlock> _inputFirst, shared_ptr<ContBlock> _inputSecond) 
: ContBlock(), inputFirst(_inputFirst), inputSecond(_inputSecond) 
{}

ContBlockMulti::ContBlockMulti(vector<shared_ptr<ContBlock>> _inputs) : ContBlock(), inputs(_inputs)
{}
