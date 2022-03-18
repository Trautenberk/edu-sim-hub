#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"

class Transition;

class PetriNetsEngine : public DiscreteEngine {
    public:
        vector<Transition*> allTransitions = {};
};

#endif