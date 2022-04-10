#include "Integrator.hpp"
#include "Constant.hpp"


Integrator::Integrator(ContBlockEngineObj engine, ContBlockObj input, double initialValue)
: ContBlockSingle(engine, input), _initialValue(initialValue), _currentState(initialValue) 
{
    engine->addIntegrator(this);
}

#define DUMMY_BLOCK make_shared<Constant>(nullptr, 0)

Integrator::Integrator(ContBlockEngineObj engine, double initialValue) 
: Integrator(engine, DUMMY_BLOCK, initialValue)
{}

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