#include "ContBlockEngine.hpp"
#include "Integrator.hpp"




ContBlockEngine::ContBlockEngine(function<double(double currentState, double derivation, double step)> integrationMethod)
: ContinousSimEngine()
{
    this->_integrationMethod = integrationMethod;
}


ContBlockEngine::ContBlockEngine()
: ContBlockEngine(IntegrationMethods::Euler)
{}

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
    for (auto integrator : this->_allIntegrators)
    {
        this->_statistics.integratorRecords[integrator->id()].push_back(integrator->getStatisticsRecord());
    }
}


class TestanContBlockEngine {
    public:
        TestanContBlockEngine() {};
};


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(ContBlockEngine) {

        emscripten::class_<TestanContBlockEngine>("TestanContBlockEngine")
        .constructor<>()
        ;

        emscripten::value_object<IntegratorRecord>("IntegratorRecord")
        .field("time", &IntegratorRecord::time)
        .field("value", &IntegratorRecord::value);

        emscripten::register_vector<IntegratorRecord>("IntegratorRecordVector");

        emscripten::register_map<objectId, std::vector<IntegratorRecord>>("IntegratorRecordsMap");

        emscripten::value_object<ContBlockStatistics>("ContBlockStatistics")
        .field("simulationTime", &ContBlockStatistics::simulationTime)
        .field("integratorRecords", & ContBlockStatistics::integratorRecords);

        emscripten::class_<ContinousSimEngine>("ContinousSimEngine");

        emscripten::class_<ContBlockEngine, emscripten::base<ContinousSimEngine>>("ContBlockEngine")
        .smart_ptr<shared_ptr<ContBlockEngine>>("shared_ptr<ContBlockEngine>")
        .constructor(&std::make_shared<ContBlockEngine>)
        .function("simulate", &ContBlockEngine::simulate)
        .function("init", &ContBlockEngine::init)
        ;
    }

#endif