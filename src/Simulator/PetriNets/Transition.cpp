#include "Transition.hpp"
#include "PetriNetsObject.hpp"
#include "../Generator/Generator.hpp"


using namespace std;

// Transition
Transition::Transition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs) 
: PetriNetsObject(id, engine)
{
    this->label = label;
    this->inputArcs = inputArcs;

    this->engine->addTransition(this);

    for (auto& arch : inputArcs)
    {
        this->placeIdsOnInput.push_back(arch->targetPlace->id());
    }

    this->outputArcs = outputArcs;

    for (auto& arch : outputArcs)
    {
        this->placeIdsOnOutput.push_back(arch->targetPlace->id());
    }

    this->allArcs.reserve(inputArcs.size() + outputArcs.size());

    this->allArcs.insert(this->allArcs.end(), outputArcs.begin(), outputArcs.end());
    this->allArcs.insert(this->allArcs.end(), inputArcs.begin(), inputArcs.end());
}

void Transition::initialize()
{
    cout << "Transition initialization withId: " << this->id()  << endl;
    // cout << "Inputs satisfied: " << this->allInputArcSsatisfied() << endl;
    for (int i = 0; i < this->allInputArcSsatisfied(); i++)
        this->planTransitionFiringEvent();

    // cout << "Transition initialized..." << this->auxName() << endl;
    return;
}

// kolikrat je přechod uspokojen
int Transition::allInputArcSsatisfied()
{
    int timesSatisfied = INT_MAX;

    // cout << "input arches count: " << this->inputArcs.size() << endl;
    if (this->inputArcs.size() == 0)
        return 0;
    
    for (auto& inputArc : this->inputArcs)
    {
        if (inputArc->satisfied() == 0)
            return 0;
        else
            timesSatisfied = min(inputArc->satisfied(), timesSatisfied);
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
    for (auto& arch : this->inputArcs)
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
    for (auto& arch : this->outputArcs)
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
    for (auto& arch : this->inputArcs)
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
    if (this->allInputArcSsatisfied() < this->plannedEventsId.size())
    {
        // odplanovat
        while(plannedEventsId.size() != this->allInputArcSsatisfied())
        {
            this->removeTransitionFiringEvent();
        }

    } else {
        // pridat do planu
        while(plannedEventsId.size() != this->allInputArcSsatisfied())
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

ImmediateTransition::ImmediateTransition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority)
: Transition(id, engine, label, inputArcs, outputArcs)
{
    this->priority = priority;
}


void ImmediateTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time(), func, this->priority);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}

ImmediateTransitionObj ImmediateTransition::New(PetriNetsEngineObj engine, std::string label, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority)
{
    return make_shared<ImmediateTransition>(SimObject::createId(immediateTransitionTypeName), engine, label, inputArcs, outputArcs, priority);
}

string ImmediateTransition::objTypeName()
{
    return immediateTransitionTypeName;
}

////////////////////////////////////////////////////////////////
// TimedTransition

const string timedTransitionTypeName = "TimedTransition";

TimedTransition::TimedTransition(objectId id, PetriNetsEngineObj engine, string label, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, double delay)
: Transition(id, engine, label, inputArcs, outputArcs)
{
    this->_delayValue = delay;
}


void TimedTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    cout << "delay: " << this->getDelay() << endl;
    cout << "planned time: " << engine->time() + this->getDelay() << endl; 
    auto event = Event(engine->time() + this->getDelay(), func);
    this->engine->calendar.insertEvent(event);
    this->plannedEventsId.push_back(event.id);    
}

string TimedTransition::objTypeName()
{
    return timedTransitionTypeName;
}


////////////////////////////////////////////////////////////////////////
// TimedConstantTransition
const string timedConstantTransitionTypeName = "TimedConstantTransition";


TimedConstantTransition::TimedConstantTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
: TimedTransition(id, engine, label, inputArcs, outputArcs, delayValue)
{}

TimedConstantTransitionObj TimedConstantTransition::New(PetriNetsEngineObj engine, std::string label, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
{
    return make_shared<TimedConstantTransition>(SimObject::createId(timedConstantTransitionTypeName), engine, label, inputArcs, outputArcs, delayValue);
}

string TimedConstantTransition::objTypeName()
{
    return timedConstantTransitionTypeName;
}

double TimedConstantTransition::getDelay()
{
    return this->_delayValue;
}


//////////////////////////////////////////////////////////////////////////////
/// TimedExponentialTransition

const std::string timedExponentialTransitionTypeName = "TimedExponentialTransition";

std::string TimedExponentialTransition::objTypeName()
{
    return timedExponentialTransitionTypeName;
}

TimedExponentialTransition::TimedExponentialTransition(objectId id, PetriNetsEngineObj engine, std::string label, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
: TimedTransition(id, engine, label, inputArcs, outputArcs, delayValue)
{}
         
       
 TimedExponentialTransitionObj TimedExponentialTransition::New(PetriNetsEngineObj engine, std::string label, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
 {
     return make_shared<TimedExponentialTransition>(SimObject::createId(timedExponentialTransitionTypeName), engine, label, inputArcs, outputArcs, delayValue);
 }

double TimedExponentialTransition::getDelay()
{
    return Generator::Exponential(this->_delayValue);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(Transition) {

        emscripten::register_vector<InputArcObj>("InputArcVec");
        emscripten::register_vector<OutputArcObj>("OutputArcVec");

        emscripten::class_<TimedConstantTransition>("TimedConstantTransition")
        .smart_ptr<shared_ptr<TimedConstantTransition>>("shared_ptr<TimedConstantTransition>")
        .constructor(&std::make_shared<TimedConstantTransition, objectId ,PetriNetsEngineObj, string, vector<InputArcObj>, vector<OutputArcObj>, double>);

        emscripten::class_<TimedExponentialTransition>("TimedExponentialTransition")
        .smart_ptr<shared_ptr<TimedExponentialTransition>>("shared_ptr<TimedExponentialTransition>")
        .constructor(&std::make_shared<TimedExponentialTransition, objectId ,PetriNetsEngineObj, string, vector<InputArcObj>, vector<OutputArcObj>, double>);


        emscripten::class_<ImmediateTransition>("ImmediateTransition")
        .smart_ptr<shared_ptr<ImmediateTransition>>("shared_ptr<ImmediateTransition>")
        .constructor(&std::make_shared<ImmediateTransition, objectId, PetriNetsEngineObj, string, vector<InputArcObj>, vector<OutputArcObj>, double>);
    }
#endif