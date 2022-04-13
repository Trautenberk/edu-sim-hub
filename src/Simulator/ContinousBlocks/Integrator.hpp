#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include <memory>
#include "ContBlockStatistics.hpp"


class Integrator : public ContBlockSingle {
    public:
        // input value = f(t,y)
        Integrator(ContBlockEngineObj engine, double initialValue);
        Integrator(ContBlockEngineObj engine, ContBlockObj input, double initialValue);
        string objTypeName() {return "IntegratorBlock";};

        void setInput(shared_ptr<ContBlock> input); 
        IntegratorRecord getStatisticsRecord();

        void eval();
        double value();
        void integrate();
        double currentState();
        double currentInputValue(); 
    private:
        shared_ptr<ContBlock> _input;
        double _currentState;  
        double _prevState; 
        double _currentInputValue;
        double _prevInputValue;
        double _initialValue;


        // TODO
};
#endif // __INTEGRATOR_H__