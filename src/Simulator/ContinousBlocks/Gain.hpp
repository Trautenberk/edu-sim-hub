#ifndef __GAIN_H__
#define __GAIN_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Gain : public ContBlockSingle {
    public:
        Gain(shared_ptr<ContBlockEngine> engine, double gain, shared_ptr<ContBlock> input);
        double gain = 0;
        string objTypeName() {return "GainBlock";};
        void eval();
        double value();
};

#endif // __GAIN_H__