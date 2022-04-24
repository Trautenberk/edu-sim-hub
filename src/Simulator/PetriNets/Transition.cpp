#include "Transition.hpp"
#include "PetriNetsObject.hpp"

using namespace std;

// Transition
Transition::Transition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches) 
: PetriNetsObject(id, engine)
{
    this->label = label;
    this->inputArches = inputArches;

    this->engine->addTransition(this);

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
    cout << "Transition initialization withId: " << this->id()  << endl;
    // cout << "Inputs satisfied: " << this->allInputArchSsatisfied() << endl;
    for (int i = 0; i < this->allInputArchSsatisfied(); i++)
        this->planTransitionFiringEvent();

    // cout << "Transition initialized..." << this->auxName() << endl;
    return;
}

// kolikrat je přechod uspokojen
int Transition::allInputArchSsatisfied()
{
    int timesSatisfied = INT_MAX;

    // cout << "input arches count: " << this->inputArches.size() << endl;
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
    this->_firedCnt++;
    std::cout << "Transition : " << this->id() << " fired!!" << std::endl; 
}

bool Transition::hasPlaceOnInput(vector<objectId> &placeIds)
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

int Transition::firedCnt()
{
    return this->_firedCnt;
}

TransitionRecord Transition::getStatisticsRecord()
{
    return TransitionRecord { this->engine->time(), this->_firedCnt };
}

////////////////////////////////////////////////////////////////
// ImmediateTransition
const string immediateTransitionTypeName = "ImmediateTransition";

ImmediateTransition::ImmediateTransition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority)
: Transition(id, engine, label, inputArches, outputArches)
{
    this->priority = priority;
}

ImmediateTransition::ImmediateTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority)
: ImmediateTransition(SimObject::createId(immediateTransitionTypeName), engine, label, inputArches, outputArches)
{}

void ImmediateTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time(), func, this->priority);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}

ImmediateTransitionObj ImmediateTransition::New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int priority)
{
    return make_shared<ImmediateTransition>(engine, label, inputArches, outputArches, priority);
}

string ImmediateTransition::objTypeName()
{
    return immediateTransitionTypeName;
}

////////////////////////////////////////////////////////////////
// TimedTransition

const string timedTransitionTypeName = "TimedTransition";

TimedTransition::TimedTransition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArchObj> inputArches, vector<OutputArchObj> outputArches, int delay)
: Transition(id, engine, label, inputArches, outputArches)
{
    this->delay = delay;
}

TimedTransition::TimedTransition(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay)
: TimedTransition(SimObject::createId(timedTransitionTypeName), engine, label, inputArches, outputArches, delay)
{}


void TimedTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time() + this->delay, func);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}

string TimedTransition::objTypeName()
{
    return timedTransitionTypeName;
}

TimedTransitionObj TimedTransition::New(PetriNetsEngineObj engine, std::string label, vector<InputArchObj> inputArches, vector<OutputArchObj>  outputArches, int delay)
{
    return make_shared<TimedTransition>(engine, label, inputArches, outputArches, delay);
}

#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Transition) {

        emscripten::register_vector<InputArchObj>("InputArchVec");
        emscripten::register_vector<OutputArchObj>("OutputArchVec");

        emscripten::class_<TimedTransition>("TimedTransition")
        .smart_ptr<shared_ptr<TimedTransition>>("shared_ptr<TimedTransition>")
        // .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<InputArchObj>, vector<OutputArchObj>, int>)
        .constructor(&std::make_shared<TimedTransition, objectId ,PetriNetsEngineObj, string, vector<InputArchObj>, vector<OutputArchObj>, int>);

        emscripten::class_<ImmediateTransition>("ImmediateTransition")
        .smart_ptr<shared_ptr<ImmediateTransition>>("shared_ptr<ImmediateTransition>")
        // .constructor(&std::make_shared<TimedTransition, shared_ptr<PetriNetsEngine>, string, vector<InputArchObj>, vector<OutputArchObj>, int>)
        .constructor(&std::make_shared<TimedTransition, objectId, PetriNetsEngineObj, string, vector<InputArchObj>, vector<OutputArchObj>, int>);
    
    }
#endif