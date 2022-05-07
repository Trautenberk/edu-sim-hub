#include "Transition.hpp"
#include "PetriNetsObject.hpp"
#include "../Generator/Generator.hpp"


using namespace std;

// konstruktor
Transition::Transition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs) 
: PetriNetsObject(id, engine)
{
    this->_inputArcs = inputArcs;

    this->engine->addTransition(this);

    // Vytvoří kolekci id vstupních míst
    for (auto& arch : _inputArcs)   
    {
        this->placeIdsOnInput.push_back(arch->targetPlace->id());
    }

    this->_outputArcs = outputArcs;

    // Vytvoří kolekci id výstupních míst
    for (auto& arch : outputArcs)
    {
        this->placeIdsOnOutput.push_back(arch->targetPlace->id());
    }

    // Kolekce všech hran
    this->_allArcs.reserve(inputArcs.size() + outputArcs.size());
    this->_allArcs.insert(this->_allArcs.end(), outputArcs.begin(), outputArcs.end());
    this->_allArcs.insert(this->_allArcs.end(), inputArcs.begin(), _inputArcs.end());
}

// Inicializační metoda
void Transition::initialize()
{
    // Kolikrát je přechod proveditelný, tolikrát se naplánuje
    for (int i = 0; i < this->allInputArcSsatisfied(); i++)
        this->planTransitionFiringEvent();

    return;
}

// kolikrat je přechod proveditelný
int Transition::allInputArcSsatisfied()
{
    int timesSatisfied = INT_MAX;

    // cout << "input arches count: " << this->_inputArcs.size() << endl;
    if (this->_inputArcs.size() == 0)
        return 0;

    // iteruje přes vstupní hrany    
    for (auto& inputArc : this->_inputArcs)
    {
        if (inputArc->satisfied() == 0) // pokud některá ze vstupních podmínek není splněna, končí
            return 0;
        else
            timesSatisfied = min(inputArc->satisfied(), timesSatisfied);    // postupně snižuje kolikrát je přechod proveditelný
    }

    return timesSatisfied;
}

// Odplánuje provedení přechodu
void Transition::removeTransitionFiringEvent()
{
    auto eventIdToCancel = _plannedEventsId.front();
    _plannedEventsId.pop_front();
    this->engine->calendar.cancelEvent(eventIdToCancel);
}

// Provedení přechodu
void Transition::fire(int eventId)
{
    for (auto i = 0; i < _plannedEventsId.size(); i++)
    {
        if (_plannedEventsId[i] == eventId)
            this->_plannedEventsId.erase(_plannedEventsId.begin() + 0);
    }

    // odebrání tokenů ze vstupních míst
    for (auto& arch : this->_inputArcs)
    {
        arch->execute();
    }

    // vyvolánít přeplánování
    for (auto& transition : this->engine->allTransitions())
    {
        // pokud má jiný přechod dané místo na vstupu
        if (transition->id() != this->id() && transition->hasPlaceOnInput(this->placeIdsOnInput))
        {
            // je potřeba ho přeplánovat
            transition->rePlanTransition();
        }
    }

    // přidání tokenů na výstupní místa
    for (auto& arch : this->_outputArcs)
    {
        arch->execute();
    }

    // vyvolání přeplánování
    for (auto& transition : this->engine->allTransitions())
    {
        // všechny přechody, které přidání tokenů do místa ovlivnilo
        if (transition->hasPlaceOnInput(this->placeIdsOnOutput))
        {
            // je opět potřeba přeplánovat
            transition->rePlanTransition();
        }
    }

    this->_firedCnt++; // zvýším počítadlo kolikrát se přechod provedl
    // std::cout << "Transition : " << this->id() << " fired!!" << std::endl; 
}

// Vrací příznak jestli má přechod dané místo na vstupu
bool Transition::hasPlaceOnInput(vector<objectId> &placeIds)
{
    for (auto& arch : this->_inputArcs)
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
    if (this->allInputArcSsatisfied() < this->_plannedEventsId.size())
    {
        // odplanovat
        while(_plannedEventsId.size() != this->allInputArcSsatisfied())
        {
            this->removeTransitionFiringEvent();
        }

    } else {
        // pridat do planu
        while(_plannedEventsId.size() != this->allInputArcSsatisfied())
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

ImmediateTransition::ImmediateTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority)
: Transition(id, engine, inputArcs, outputArcs)
{
    this->priority = priority;
}

// Přechod se naplánuje s nulovým zpožděním
void ImmediateTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time(), func, this->priority);
    this->engine->calendar.insertEvent(event);
    this->_plannedEventsId.push_back(event.id);    
}

// Pomocná metoda pro konstrukci okamžitého přechodu
ImmediateTransitionObj ImmediateTransition::New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, int priority)
{
    return make_shared<ImmediateTransition>(SimObject::createId(immediateTransitionTypeName), engine, inputArcs, outputArcs, priority);
}

string ImmediateTransition::objTypeName()
{
    return immediateTransitionTypeName;
}

////////////////////////////////////////////////////////////////
// TimedTransition

const string timedTransitionTypeName = "TimedTransition";

//  Konstruktor
TimedTransition::TimedTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj> outputArcs, double delay)
: Transition(id, engine, inputArcs, outputArcs)
{
    this->_delayValue = delay;
}

// Přeplánování časovaného přechodu
void TimedTransition::planTransitionFiringEvent()
{
    auto func = [this](int evenetId) {this->fire(evenetId);};
    auto event = Event(engine->time() + this->getDelay(), func); // přidává dané zpoždění
    this->engine->calendar.insertEvent(event);
    this->_plannedEventsId.push_back(event.id);    
}

string TimedTransition::objTypeName()
{
    return timedTransitionTypeName;
}


////////////////////////////////////////////////////////////////////////
// TimedConstantTransition
const string timedConstantTransitionTypeName = "TimedConstantTransition";

// Konstruktor
TimedConstantTransition::TimedConstantTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
: TimedTransition(id, engine, inputArcs, outputArcs, delayValue)
{}

// Pomocná metoda pro konstrukci
TimedConstantTransitionObj TimedConstantTransition::New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
{
    return make_shared<TimedConstantTransition>(SimObject::createId(timedConstantTransitionTypeName), engine,  inputArcs, outputArcs, delayValue);
}

string TimedConstantTransition::objTypeName()
{
    return timedConstantTransitionTypeName;
}

// Vrací konstantní hodnotu zpoždění
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

// Konstruktor
TimedExponentialTransition::TimedExponentialTransition(objectId id, PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
: TimedTransition(id, engine, inputArcs, outputArcs, delayValue)
{}
         
// Pomocná metoda pro konstrukci
 TimedExponentialTransitionObj TimedExponentialTransition::New(PetriNetsEngineObj engine, vector<InputArcObj> inputArcs, vector<OutputArcObj>  outputArcs, double delayValue)
 {
     return make_shared<TimedExponentialTransition>(SimObject::createId(timedExponentialTransitionTypeName), engine, inputArcs, outputArcs, delayValue);
 }

// Vrací náhodné zpoždění dané exponenciálním rozložením
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
        .constructor(&std::make_shared<TimedConstantTransition, objectId ,PetriNetsEngineObj, vector<InputArcObj>, vector<OutputArcObj>, double>);

        emscripten::class_<TimedExponentialTransition>("TimedExponentialTransition")
        .smart_ptr<shared_ptr<TimedExponentialTransition>>("shared_ptr<TimedExponentialTransition>")
        .constructor(&std::make_shared<TimedExponentialTransition, objectId ,PetriNetsEngineObj, vector<InputArcObj>, vector<OutputArcObj>, double>);


        emscripten::class_<ImmediateTransition>("ImmediateTransition")
        .smart_ptr<shared_ptr<ImmediateTransition>>("shared_ptr<ImmediateTransition>")
        .constructor(&std::make_shared<ImmediateTransition, objectId, PetriNetsEngineObj, vector<InputArcObj>, vector<OutputArcObj>, double>);
    }
#endif