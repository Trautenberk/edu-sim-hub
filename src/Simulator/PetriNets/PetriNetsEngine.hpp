#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"
#include "PetriNetsStatistics.hpp"
#include <memory>

class Transition;

template <typename T> using PNObj = std::shared_ptr<T>; 

class PetriNetsEngine : public DiscreteEngine {
    public:
        PetriNetsEngine();
        static PNObj<PetriNetsEngine> New();
        void addPlace(Place* place);
        void addTransition(Transition* transition);
        vector<Transition*> allTransitions = {};            // TODO vyhodit jako private
        void gatherStatistics() override;


    private:
        vector<Place*> _allPlaces = {};
        unique_ptr<PetriNetsStatistics> statistics = make_unique<PetriNetsStatistics>();
    

};

#endif