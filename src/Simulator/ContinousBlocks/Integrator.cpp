#include "Integrator.hpp"
#include "Constant.hpp"

const string integratorTypeName = "IntegratorBlock";

Integrator::Integrator(objectId id, ContBlockEngineObj engine, ContBlockObj input, double initialValue)
: ContBlockSingle(id, engine, input), _initialValue(initialValue), _currentState(initialValue) 
{
    engine->addIntegrator(this);
}

Integrator::Integrator(ContBlockEngineObj engine, ContBlockObj input, double initialValue)
: Integrator(SimObject::createId(integratorTypeName), engine, input, initialValue)
{}


#define DUMMY_BLOCK make_shared<Constant>(nullptr, 0)

Integrator::Integrator(objectId id, ContBlockEngineObj engine, double initialValue) 
: Integrator(id, engine, DUMMY_BLOCK, initialValue)
{}

Integrator::Integrator(ContBlockEngineObj engine, double initialValue) 
: Integrator(SimObject::createId(integratorTypeName), engine, DUMMY_BLOCK, initialValue)
{}

string Integrator::objTypeName()
{
    return integratorTypeName;
}

void Integrator::eval()
{
    this->_currentInputValue = this->input->value();
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

void Integrator::setInput(shared_ptr<ContBlock> input)
{
    this->input = input;
} 

IntegratorRecord Integrator::getStatisticsRecord()
{
    return IntegratorRecord(this->value());
}


#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
    EMSCRIPTEN_BINDINGS(IntegratorBlock) {
        emscripten::class_<Integrator>("Integrator")
        .smart_ptr<shared_ptr<Integrator>>("shared_ptr<Integrator>")
        .constructor(&std::make_shared<Integrator, objectId, ContBlockEngineObj, ContBlockObj, double>);
    }

#endif