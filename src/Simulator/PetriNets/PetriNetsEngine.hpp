#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"
#include "PetriNetsStatistics.hpp"
#include <memory>

class Transition;
class PetriNetsEngine;

using PetriNetsEngineObj = shared_ptr<PetriNetsEngine>;

class PetriNetsEngine : public DiscreteEngine {
    public:
        PetriNetsEngine();
        static PetriNetsEngineObj New();
        void addPlace(Place* place);
        void addTransition(Transition* transition);
        vector<Transition*> allTransitions = {};            // TODO vyhodit jako private
        void gatherStatistics() override;


    private:
        vector<Place*> _allPlaces = {};
        unique_ptr<PetriNetsStatistics> _statistics = make_unique<PetriNetsStatistics>();
};

#endif