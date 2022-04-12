#include "PetriNetsEngine.hpp"
#include "Place.hpp"
#include "Transition.hpp"

PetriNetsEngine::PetriNetsEngine() : DiscreteEngine() 
{
    cout << "PetriNetsEngine constructor" << endl;
}

void PetriNetsEngine::addTransition(Transition *transition)
{
    this->allTransitions.push_back(transition);
}

void PetriNetsEngine::addPlace(Place *place)
{
    this->_allPlaces.push_back(place);
}

PNObj<PetriNetsEngine> PetriNetsEngine::New()
{
    return make_shared<PetriNetsEngine>();
}

void PetriNetsEngine::gatherStatistics()
{
    auto record = PNStatisticsRecord();
    record.time = this->time();

    for (auto place : this->_allPlaces)
    {
        record.placeRecords.insert(std::pair<objectId, PlaceRecord>(place->id(), place->getStatisticsRecord()));
    }

    for (auto transition : this->allTransitions)
    {
        record.transitionRecords.insert(std::pair<objectId, TransitionRecord>(transition->id(), transition->getStatisticsRecord()));
    }

    this->statistics->records.push_back(record);
}

#ifdef EMSCRIPTEN
 EMSCRIPTEN_BINDINGS(PetriNetsEngine) {
     emscripten::class_<PetriNetsEngine, emscripten::base<DiscreteEngine>>("PetriNetsEngine")
     .smart_ptr_constructor<shared_ptr<PetriNetsEngine>>("shared_ptr<PetriNetsEngine>", &std::make_shared<PetriNetsEngine>);
 }
#endif