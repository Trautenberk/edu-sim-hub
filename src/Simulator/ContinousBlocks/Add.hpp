#ifndef __ADD_H__
#define __ADD_H__

#include "ContBlock.hpp"

class Add : public ContBlockDouble {
    public:
        Add(objectId id, ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine, ContBlockObj inputFirst, ContBlockObj inputSecond);
        void eval();
        double value();
        string objTypeName();
};

#endif // __ADD_H__