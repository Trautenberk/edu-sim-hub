#ifndef __CONTBLOCKENGINE_H__
#define __CONTBLOCKENGINE_H__

#include "../ContinousSimulation/ContinousSimEngine.hpp"
#include "../IntegrationMethods/IntegrationMethods.hpp"
#include "ContBlockStatistics.hpp"
#include <memory>
#include <vector>

class Integrator;
class ContBlockEngine;


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using ContBlockEngineObj = shared_ptr<ContBlockEngine>;

class ContBlockEngine : public ContinousSimEngine {
    public:
        ContBlockEngine();
        ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod);
        static ContBlockEngineObj New(function<double(double currentState, double derivation, double step)> integrationMethod);
        void addIntegrator(Integrator *integrator);
        void simStep();
        void dynamic();
        void integrate();   // provedu integraci na vsech integratorech
        function<double(double currentState, double derivation, double step)> integrationMethod();
        void gatherStatistics();

    private:
        std::vector<Integrator*> _allIntegrators;
        ContBlockStatistics _statistics = ContBlockStatistics();  
        function<double(double currentState, double derivation, double step)> _integrationMethod;
};




#endif // __CONTBLOCKENGINE_H__