#include "ContBlockEngine.hpp"
#include "Integrator.hpp"


ContBlockEngine::ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod) 
: ContinousSimEngine()
{
    this->_integrationMethod = integrationMethod;
}

void ContBlockEngine::addIntegrator(Integrator *integrator)
{
    this->_integrators.push_back(integrator);
}

void ContBlockEngine::simStep() 
{
    this->dynamic();    // aktualizace stavu systemu
    this->integrate();  // provedu integraci na vsech integratorech
    this->_time += this->_stepSize;   // inkrementace casu
}


void ContBlockEngine::dynamic()
{
    if (this->_integrators.empty())
        return;
        
    for (auto integratorPtr : this->_integrators)
    {
        integratorPtr->eval(); // nactu vstupy integratoru
    }
}

void ContBlockEngine::integrate()
{
    if (this->_integrators.empty())
        return;

    for (auto integratorPtr : this->_integrators)
    {
        integratorPtr->integrate();    // provedu integraci na vsech integratorech
    }
}

function<double(double currentState, double derivation, double step)> ContBlockEngine::integrationMethod()
{
    return this->_integrationMethod;
}