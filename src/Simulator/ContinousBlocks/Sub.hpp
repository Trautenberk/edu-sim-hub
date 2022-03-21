#ifndef __SUB_H__
#define __SUB_H__

#include "ContBlock.hpp"

class Sub : public ContBlockDouble {
    public:
        Sub(shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond);
        string objTypeName() {return "SubBlock";};
        void eval();
        double value();
};
#endif // __SUB_H__