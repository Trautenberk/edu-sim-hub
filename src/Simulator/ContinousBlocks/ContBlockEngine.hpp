#ifndef __CONTBLOCKENGINE_H__
#define __CONTBLOCKENGINE_H__

#include "../ContinousSimulation/ContinousSimEngine.hpp"
#include "../IntegrationMethods/IntegrationMethods.hpp"
#include <memory>
#include <vector>

class Integrator;

class ContBlockEngine : public ContinousSimEngine {
    public:
        ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod);
        void addIntegrator(Integrator *integrator);
        void simStep();
        void dynamic();
        void integrate();   // provedu integraci na vsech integratorech
        function<double(double currentState, double derivation, double step)> integrationMethod();

    private:
        std::vector<Integrator*> _integrators;
        function<double(double currentState, double derivation, double step)> _integrationMethod;
};

#endif // __CONTBLOCKENGINE_H__