#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"
#include "PetriNetsStatistics.hpp"
#include <memory>

class Transition;

class PetriNetsEngine : public DiscreteEngine {
    public:
        PetriNetsEngine();
        vector<Transition*> allTransitions = {};
        unique_ptr<PetriNetsStatistics> statistics;
};

#endif