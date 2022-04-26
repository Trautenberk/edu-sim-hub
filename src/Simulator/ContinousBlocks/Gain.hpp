#ifndef __GAIN_H__
#define __GAIN_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Gain : public ContBlockSingle {
    public:
        Gain(objectId id, ContBlockEngineObj engine, double gain);
        static ContBlockObj New(ContBlockEngineObj engine, double gain);
        static ContBlockObj New(ContBlockEngineObj engine, double gain, ContBlockObj input);        
        string objTypeName();
        void eval();
        double value();
    private:
        double _gain = 1;

};

#endif // __GAIN_H__