#include "ContBlockEngine.hpp"
#include "Integrator.hpp"


ContBlockEngine::ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod) 
: ContinousSimEngine()
{
    this->_integrationMethod = integrationMethod;
}

void ContBlockEngine::addIntegrator(Integrator *integrator)
{
    this->_allIntegrators.push_back(integrator);
}

void ContBlockEngine::simStep() 
{
    this->dynamic();    // aktualizace stavu modelu
    this->integrate();  // provedu integraci na vsech integratorech
    this->_time += this->_stepSize;   // inkrementace casu
}


void ContBlockEngine::dynamic()
{
    if (this->_allIntegrators.empty())
        return;
        
    for (auto integratorPtr : this->_allIntegrators)
    {
        integratorPtr->eval(); // nactu vstupy integratoru
    }
}

void ContBlockEngine::integrate()
{
    if (this->_allIntegrators.empty())
        return;

    for (auto integratorPtr : this->_allIntegrators)
    {
        integratorPtr->integrate();    // provedu integraci na vsech integratorech
    }
}

function<double(double currentState, double derivation, double step)> ContBlockEngine::integrationMethod()
{
    return this->_integrationMethod;
}


ContBlockEngineObj ContBlockEngine::New(function<double(double currentState, double derivation, double step)> integrationMethod)
{
    return make_shared<ContBlockEngine>(integrationMethod);
}

void ContBlockEngine::gatherStatistics()
{
    auto record = ContBlockStatisticsRecord();
    record.time = this->time();

    for (auto integrator : this->_allIntegrators)
    {
        record.integratorRecords.insert(std::pair<objectId, IntegratorRecord>(integrator->id(), integrator->getStatisticsRecord()));
    }

    this->_statistics.records.push_back(record);
}




#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>

    EMSCRIPTEN_BINDINGS(ContBlockEngine) {
        emscripten::class_<ContBlockEngine>("ContBlockEngine")
        .smart_ptr<shared_ptr<ContBlockEngine>>("shared_ptr<ContBlockEngine>")
        .constructor(&std::make_shared<ContBlockEngine, function<double(double currentState, double derivation, double step)>>)
        ;
    }

#endif