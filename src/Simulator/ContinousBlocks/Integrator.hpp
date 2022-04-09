#ifndef __INTEGRATOR_H__
#define __INTEGRATOR_H__

#include "ContBlock.hpp"
#include <memory>

class Integrator : ContBlockSingle {
    public:
        // input value = f(t,y)
        Integrator(shared_ptr<ContBlockEngine> engine, double initialValue);
        Integrator(shared_ptr<ContBlockEngine> engine, shared_ptr<ContBlock> input, double initialValue);
        string objTypeName() {return "IntegratorBlock";};

        void setInput(shared_ptr<ContBlock> input); 
        
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