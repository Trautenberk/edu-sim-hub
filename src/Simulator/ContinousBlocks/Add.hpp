#ifndef __ADD_H__
#define __ADD_H__

#include "ContBlock.hpp"

class Add : public ContBlockDouble {
    public:
        Add(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        void eval();
        double value();
        string objTypeName() {return "AddBlock";};

};

#endif // __ADD_H__