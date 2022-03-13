#include "Transition.hpp"


Transition::Transition(string label, vector<InputArch*> inputArches, vector<OutputArch*> outputArches) : SimObject()
{
    this->_label;
    this->inputArches = inputArches;

    this->allArches.reserve(inputArches.size() + outputArches.size());

    this->allArches.insert(this->allArches.end(), outputArches.begin(), outputArches.end());
    this->allArches.insert(this->allArches.end(), inputArches.begin(), inputArches.end());
}

Transition::Transition(string label, InputArch* inputArch, OutputArch* outputArch) : Transition(label, vector<InputArch*>{inputArch}, vector<OutputArch*>{outputArch})
{}

Transition::~Transition()
{
}

string Transition::getObjType()
{
    return "Transition";
}

void Transition::initialize()
{
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
    Calendar& calendar = Global::discreteSimEngine->calendar;
    calendar.test += 5;
    auto func = [this]() {this->fire();};
    auto event = Event(0, func);
    calendar.insertEvent(make_shared<Event>(event));
}

void Transition::fire()
{
    for (auto& arch : this->allArches)
    {
        arch->execute();
    }
}