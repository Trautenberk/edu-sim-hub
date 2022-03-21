#ifndef __DIV_H__
#define __DIV_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Div : public ContBlockDouble {
    public:
        Div(shared_ptr<ContBlock> value, shared_ptr<ContBlock> divider);
        string objTypeName() {return "DivBlock";};
        void eval();
        double value();
};

#endif // __DIV_H__