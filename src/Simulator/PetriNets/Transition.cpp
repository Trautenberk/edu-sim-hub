#include "Transition.hpp"


Transition::Transition(string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches) : SimObject()
{
    this->_label;
    this->inputArches = inputArches;

    for (auto& arch : inputArches)
    {
        this->placeIdsOnInput.push_back(arch->targetPlace->id);
    }

    this->outputArches = outputArches;

    for (auto& arch : outputArches)
    {
        this->placeIdsOnOutput.push_back(arch->targetPlace->id);
    }

    this->allArches.reserve(inputArches.size() + outputArches.size());

    this->allArches.insert(this->allArches.end(), outputArches.begin(), outputArches.end());
    this->allArches.insert(this->allArches.end(), inputArches.begin(), inputArches.end());
}

Transition::Transition(string label, shared_ptr<InputArch> inputArch, shared_ptr<OutputArch> outputArch) 
: Transition(label, vector<shared_ptr<InputArch>>({inputArch}), vector<shared_ptr<OutputArch>>({outputArch}))
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
    auto func = [this]() {this->fire();};
    auto event = Event(0, func);
    calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);
}

void Transition::fire()
{
    for (auto& arch : this->allArches)
    {
        arch->execute();
    }

    auto& engine = Global::discreteSimEngine;

    for (auto& transition : engine->allTransitions)
    {
        if (transition->id != this->id)
        {
            // temhle prechodum jsem odebral na vstupu
            if (transition->hasPlaceOnInput(this->placeIdsOnInput))
            {

            }
            // temhle jsem pridal na vstupu 
            else if (transition->hasPlaceOnInput(this->placeIdsOnOutput))
            {

            }
        }
    }
}