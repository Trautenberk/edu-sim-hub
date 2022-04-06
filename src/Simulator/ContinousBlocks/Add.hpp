#ifndef __ADD_H__
#define __ADD_H__

#include "ContBlock.hpp"

class Add : public ContBlockDouble {
    public:
        Add(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> inputFirst, shared_ptr<ContBlock> inputSecond);
        void eval();
        double value();
        string objTypeName() {return "AddBlock";};

};

#endif // __ADD_H__