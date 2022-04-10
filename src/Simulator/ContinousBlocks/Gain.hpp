#ifndef __GAIN_H__
#define __GAIN_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Gain : public ContBlockSingle {
    public:
        Gain(ContBlockEngineObj engine, double gain, ContBlockObj input);
        static ContBlockObj New(ContBlockEngineObj engine, double gain, ContBlockObj input);        
        double gain = 1;
        string objTypeName() {return "GainBlock";};
        void eval();
        double value();
};

#endif // __GAIN_H__