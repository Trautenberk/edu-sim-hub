#ifndef __MUL_H__
#define __MUL_H__

#include "ContBlock.hpp"

class Mul : public ContBlockDouble {
    public:
        Mul(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond);
        string objTypeName() {return "MulBlock";};
        void eval();
        double value();
};
#endif // __MUL_H__