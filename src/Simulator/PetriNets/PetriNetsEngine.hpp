#ifndef PETRI_NETS_ENGINE_H
#define PETRI_NETS_ENGINE_H

#include "../DiscreteSimulation/DiscreteEngine.hpp"

class Transition;

class PetriNetsEngine : public DiscreteEngine {
    public:
        static PetriNetsEngine& getInstance()
        {
            static PetriNetsEngine instance;
            return instance;
        }
        vector<Transition*> allTransitions = {};
};

#endif