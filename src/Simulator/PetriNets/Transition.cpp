#include "Transition.hpp"

using namespace std;

// Transition
Transition::Transition(shared_ptr<PetriNetsEngine> engine, string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches, string auxName) 
: PetriNetsObject(engine, auxName)
{
    this->label = label;
    this->inputArches = inputArches;

    this->engine->allTransitions.push_back(this);

    for (auto& arch : inputArches)
    {
        this->placeIdsOnInput.push_back(arch->targetPlace->id());
    }

    this->outputArches = outputArches;

    for (auto& arch : outputArches)
    {
        this->placeIdsOnOutput.push_back(arch->targetPlace->id());
    }

    this->allArches.reserve(inputArches.size() + outputArches.size());

    this->allArches.insert(this->allArches.end(), outputArches.begin(), outputArches.end());
    this->allArches.insert(this->allArches.end(), inputArches.begin(), inputArches.end());
}

void Transition::initialize()
{
    cout << "Transition initialization" << endl;
    cout << "Inputs satisfied: " << this->allInputArchSsatisfied() << endl;
    for (int i = 0; i < this->allInputArchSsatisfied(); i++)
        this->planTransitionFiringEvent();

    cout << "Initialize transition" << endl;
    return;
}

// kolikrat je přechod uspokojen
int Transition::allInputArchSsatisfied()
{
    int timesSatisfied = INT_MAX;

    cout << "input arches count: " << this->inputArches.size() << endl;
    if (this->inputArches.size() == 0)
        return 0;
    
    for (auto& inputArch : this->inputArches)
    {
        if (inputArch->satisfied() == 0)
            return 0;
        else
            timesSatisfied = min(inputArch->satisfied(), timesSatisfied);
    }
    return timesSatisfied;
}

void Transition::removeTransitionFiringEvent()
{
    auto eventIdToCancel = plannedEventsId.front();
    plannedEventsId.pop_front();
    this->engine->calendar.cancelEvent(eventIdToCancel);
}

void Transition::fire(int eventId)
{
    for (auto i = 0; i < plannedEventsId.size(); i++)
    {
        if (plannedEventsId[i] == eventId)
            this->plannedEventsId.erase(plannedEventsId.begin() + 0);
    }

    // odebrani
    for (auto& arch : this->inputArches)
    {
        arch->execute();
    }

    for (auto& transition : this->engine->allTransitions)
    {
        if (transition->id() != this->id() && transition->hasPlaceOnInput(this->placeIdsOnInput))
        {
            // temhle prechodum jsem odebral na vstupu
            transition->rePlanTransition();
        }
    }

    // pridani tokenu
    for (auto& arch : this->outputArches)
    {
        arch->execute();
    }

    for (auto& transition : this->engine->allTransitions)
    {
        if (transition->hasPlaceOnInput(this->placeIdsOnOutput))
        {
            // temhle jsem pridal na vstupu
            transition->rePlanTransition();
        }
    }
    this->firedCnt++;
}

bool Transition::hasPlaceOnInput(vector<int> &placeIds)
{
    for (auto& arch : this->inputArches)
    {
        if (find(placeIds.begin(), placeIds.end(), arch->targetPlace->id()) != placeIds.end())
        {
            return true;
        }
    }
    return false;
}

void Transition::rePlanTransition()
{
    // musim preplanovat
    if (this->allInputArchSsatisfied() < this->plannedEventsId.size())
    {
        // odplanovat
        while(plannedEventsId.size() != this->allInputArchSsatisfied())
        {
            this->removeTransitionFiringEvent();
        }

    } else {
        // pridat do planu
        while(plannedEventsId.size() != this->allInputArchSsatisfied())
        {
            this->planTransitionFiringEvent();
        }
    }
}


////////////////////////////////////////////////////////////////
// ImmediateTransition

ImmediateTransition::ImmediateTransition(shared_ptr<PetriNetsEngine> engine, string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches, int priority, string auxName)
: Transition(engine, label, inputArches, outputArches, auxName)
{
    this->priority = priority;
}

void ImmediateTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time, func, this->priority);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}


////////////////////////////////////////////////////////////////
// TimedTransition

TimedTransition::TimedTransition(shared_ptr<PetriNetsEngine> engine, string label, vector<shared_ptr<InputArch>> inputArches, vector<shared_ptr<OutputArch>> outputArches, int delay, string auxName)
: Transition(engine, label, inputArches, outputArches, auxName)
{
    this->delay = delay;
}

void TimedTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time + this->delay, func);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}

#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Transition) {

        emscripten::register_vector<shared_ptr<InputArch>>("InputArchVec");
        emscripten::register_vector<shared_ptr<OutputArch>>("OutputArchVec");

        emscripten::class_<TimedTransition>("TimedTransition")
        .smart_ptr<shared_ptr<TimedTransition>>("shared_ptr<TimedTransition>")
        // .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<shared_ptr<InputArch>>, vector<shared_ptr<OutputArch>>, int>)
        .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<shared_ptr<InputArch>>, vector<shared_ptr<OutputArch>>, int, string>);

        emscripten::class_<ImmediateTransition>("ImmediateTransition")
        .smart_ptr<shared_ptr<ImmediateTransition>>("shared_ptr<ImmediateTransition>")
        // .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<shared_ptr<InputArch>>, vector<shared_ptr<OutputArch>>, int>)
        .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<shared_ptr<InputArch>>, vector<shared_ptr<OutputArch>>, int, string>);
    
    }
#endif