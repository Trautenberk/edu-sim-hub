#include "PetriNetsEngine.hpp"
#include "Place.hpp"
#include "Transition.hpp"

// Konstruktor
PetriNetsEngine::PetriNetsEngine() : DiscreteEngine() 
{
    // cout << "PetriNetsEngine constructor" << endl;
}

// Přidá přechod do interní kolekce
void PetriNetsEngine::addTransition(Transition *transition)
{
    this->_allTransitions.push_back(transition);
}

// Přidá místo do interní kolekce
void PetriNetsEngine::addPlace(Place *place)
{

    this->_allPlaces.push_back(place);
}

// Pomocná metoda pro konstrukci
PetriNetsEngineObj PetriNetsEngine::New()
{
    return make_shared<PetriNetsEngine>();
}

// Sběr statistik
void PetriNetsEngine::gatherStatistics()
{
    for (auto place : this->_allPlaces)
    {
        this->_statistics.placeRecords[place->id()].push_back(place->getStatisticsRecord());
    }

    for (auto transition : this->_allTransitions)
    {
        this->_statistics.transitionRecords[transition->id()].push_back(transition->getStatisticsRecord());
    }
}

// Getter statistik
PetriNetsStatistics PetriNetsEngine::statistics() {
    return this->_statistics;
}

// Getter kolekce všech přechodů
vector<Transition*>& PetriNetsEngine::allTransitions()
{
    return this->_allTransitions;
}


#ifdef EMSCRIPTEN
 EMSCRIPTEN_BINDINGS(PetriNetsEngine) {

        emscripten::value_object<PlaceRecord>("PlaceRecord")
            .field("time", &PlaceRecord::time)
            .field("tokens", &PlaceRecord::tokens);

        emscripten::value_object<TransitionRecord>("TransitionRecord")
            .field("time", &TransitionRecord::time)
            .field("fired", &TransitionRecord::fired);

        emscripten::register_vector<PlaceRecord>("PlaceRecordVector");
        emscripten::register_vector<TransitionRecord>("TransitionRecordVector");

        emscripten::register_map<objectId, std::vector<PlaceRecord>>("PlaceRecordsMap");
        emscripten::register_map<objectId, std::vector<TransitionRecord>>("TransitionRecordsMap");

        emscripten::value_object<PetriNetsStatistics>("PetriNetsStatistics")
            .field("simulationTime", &PetriNetsStatistics::simulationTime)
            .field("placeRecords", &PetriNetsStatistics::placeRecords)
            .field("transitionRecords", &PetriNetsStatistics::transitionRecords);


        emscripten::class_<DiscreteEngine>("DiscreteEngine");
        
        emscripten::class_<PetriNetsEngine, emscripten::base<DiscreteEngine>>("PetriNetsEngine")
            .smart_ptr_constructor<shared_ptr<PetriNetsEngine>>("shared_ptr<PetriNetsEngine>", &std::make_shared<PetriNetsEngine>)
            .function("statistics", &PetriNetsEngine::statistics)
            .function("simulate", &PetriNetsEngine::simulate)
            .function("init", &PetriNetsEngine::init)
        ;
 }
#endif