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
        vector<Transition*> allTransitions = {};
        unique_ptr<PetriNetsStatistics> statistics;
};

#endif