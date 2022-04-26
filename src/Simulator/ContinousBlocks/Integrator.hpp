#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include <memory>
#include "ContBlockStatistics.hpp"


class Integrator : public ContBlockSingle {
    public:
        // input value = f(t,y)
        Integrator(objectId id, ContBlockEngineObj engine, double initialValue);
        static ContBlockObj New(ContBlockEngineObj engine, double initialValue);
        static ContBlockObj New(ContBlockEngineObj engine, double initialValue, ContBlockObj input);
        
        string objTypeName();
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