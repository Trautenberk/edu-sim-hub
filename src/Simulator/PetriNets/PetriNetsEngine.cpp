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

PetriNetsEngineObj PetriNetsEngine::New()
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

    this->_statistics.records.push_back(record);
}

PetriNetsStatistics PetriNetsEngine::statistics() {
    return this->_statistics;
}

#ifdef EMSCRIPTEN
 EMSCRIPTEN_BINDINGS(PetriNetsEngine) {

        emscripten::value_object<PlaceRecord>("PlaceRecord")
            .field("tokens", &PlaceRecord::tokens);

        emscripten::value_object<TransitionRecord>("TransitionRecord")
            .field("fired", &TransitionRecord::fired);

        emscripten::register_map<objectId, PlaceRecord>("PlaceRecordsMap");
        emscripten::register_map<objectId, TransitionRecord>("TransitionRecordsMap");
        emscripten::register_vector<PNStatisticsRecord>("PNStatisticsRecordVector");

        emscripten::value_object<PNStatisticsRecord>("PNStatisticsRecord")
            .field("time", &PNStatisticsRecord::time)
            .field("placeRecords", &PNStatisticsRecord::placeRecords)
            .field("transitionRecords", &PNStatisticsRecord::transitionRecords);

        emscripten::value_object<PetriNetsStatistics>("PetriNetsStatistics")
            .field("simulationTime", &PetriNetsStatistics::simulationTime)
            .field("records", &PetriNetsStatistics::records);

        emscripten::class_<PetriNetsEngine, emscripten::base<DiscreteEngine>>("PetriNetsEngine")
            .smart_ptr_constructor<shared_ptr<PetriNetsEngine>>("shared_ptr<PetriNetsEngine>", &std::make_shared<PetriNetsEngine>)
            .function("statistics", &PetriNetsEngine::statistics)
        ;
 }
#endif