#include "Transition.hpp"


Transition::Transition(string label, vector<InputArch*> inputArches, vector<OutputArch*> outputArches) : SimObject()
{
    this->_label;
    this->inputArches = inputArches;
}

Transition::Transition(string label, InputArch* inputArch, OutputArch* outputArch) : SimObject()
{
    this->_label = label;
    this->inputArches = {inputArch};
    this->outputArches = {outputArch};
}

Transition::~Transition()
{
}

string Transition::getObjType()
{
    return "Transition";
}

void Transition::initialize()
{
    auto& calendar = Global::calendar;

    if (this->allInputArchSsatisfied())
        this->planTransitionFiringEvent();

    cout << "Initialize transition" << endl;
    return;
}


bool Transition::allInputArchSsatisfied()
{
    for (auto& inputArch : this->inputArches)
    {
        if (!inputArch->satisfied())
            return false;
    }
    return true;
}

void Transition::planTransitionFiringEvent()
{
    auto& calendar = Global::calendar;
    auto func = [this]() {this->fire();};
    auto event = Event(0, func);
    calendar->insertEvent(event);
}

void Transition::fire()
{
    for (auto& inputArch : this->inputArches)
    {
        inputArch->execute();
    }

    for (auto& outputArch : this->outputArches)
    {
        outputArch->execute();
    }
}