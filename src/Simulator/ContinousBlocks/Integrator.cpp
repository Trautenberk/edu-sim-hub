#include "Integrator.hpp"
#include "Constant.hpp"

const string integratorTypeName = "IntegratorBlock";

Integrator::Integrator(objectId id, ContBlockEngineObj engine, double initialValue)
: ContBlockSingle(id, engine), _initialValue(initialValue), _currentState(initialValue) 
{
    engine->addIntegrator(this);
}

ContBlockObj Integrator::New(ContBlockEngineObj engine, double initialValue)
{
    return make_shared<Integrator>(SimObject::createId(integratorTypeName), engine, initialValue);
}

ContBlockObj Integrator::New(ContBlockEngineObj engine, double initialValue, ContBlockObj input)
{
    auto obj = make_shared<Integrator>(SimObject::createId(integratorTypeName), engine, initialValue);
    obj->setInput(input);
    return obj;
}

string Integrator::objTypeName()
{
    return integratorTypeName;
}

void Integrator::eval()
{
    this->_currentInputValue = this->_input->value();
}

double Integrator::value()
{
    return this->_currentState;
}

void Integrator::integrate()
{
    this->_prevState = this->_currentState;
    auto integrationMethod = this->engine->integrationMethod();
    this->_currentState = integrationMethod(this->_currentState, this->_currentInputValue, this->engine->stepSize());
}

double Integrator::currentState()
{
    return this->_currentState;
}

double Integrator::currentInputValue()
{
    return this->_currentInputValue;
}

IntegratorRecord Integrator::getStatisticsRecord()
{
    return IntegratorRecord{this->engine->time(), this->value()};
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(IntegratorBlock) {
        emscripten::class_<Integrator>("Integrator")
        .smart_ptr<shared_ptr<Integrator>>("shared_ptr<Integrator>")
        .constructor(&std::make_shared<Integrator, objectId, ContBlockEngineObj, double>);
    }
#endif