#ifndef __MUL_H__
#define __MUL_H__

#include "ContBlock.hpp"

class Mul : public ContBlockDouble {
    public:
        Mul(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);

        string objTypeName() {return "MulBlock";};
        void eval();
        double value();
};
#endif // __MUL_H__