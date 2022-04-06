#ifndef __CONSTANT_H__
#define __CONSTANT_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Constant : public ContBlock
{
    public:
        Constant(shared_ptr<ContBlockEngine> engine, double value);
        void eval();
        double value();
        string objTypeName() {return "ConstantBlock";};
    private: 
        double _value;
};


#endif // __CONSTANT_H__