#ifndef __SUB_H__
#define __SUB_H__

#include "ContBlock.hpp"

class Sub : public ContBlockDouble {
    public:
        Sub(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        string objTypeName() {return "SubBlock";};
        void eval();
        double value();
};
#endif // __SUB_H__