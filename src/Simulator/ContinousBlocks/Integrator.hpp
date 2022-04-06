#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include "Constant.hpp"
#include <memory>

using namespace std;

class Integrator : ContBlock {
    public:
        Integrator(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> input, double initialValue);
        string objTypeName() {return "IntegratorBlock";};
        void updateState();
        double prevStateValue;

        void eval();
        double value();
    private:
        double _initialValue;

        // TODO
};
#endif // __INTEGRATOR_H__