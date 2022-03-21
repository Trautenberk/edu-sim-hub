#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include <memory>

using namespace std;

class Integrator : ContBlock {
    public:
        Integrator();
        void updateState();
        double initialValue;
        double prevStateValue;
        string objTypeName() {return "IntegratorBlock";};
        void eval();
        double value();
        // TODO
};
#endif // __INTEGRATOR_H__