#ifndef __TIME_H__
#define __TIME_H__

#include "ContBlock.hpp"

class Time : public ContBlock {
    public:
        Time(ContBlockEngineObj engine);
        static ContBlockObj New(ContBlockEngineObj engine);

        void eval();
        double value();
        string objTypeName() {return "TimeBlock";};

};

#endif // __TIME_H__