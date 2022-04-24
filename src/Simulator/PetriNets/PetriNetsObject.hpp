#ifndef PETRI_NETS_OBJECTS_H
#define PETRI_NETS_OBJECTS_H

#include "../DiscreteSimulation/DiscreteSimObject.hpp"
#include "PetriNetsEngine.hpp"


class PetriNetsObject : public DiscreteSimObject {
    public:
        PetriNetsObject(objectId id, PetriNetsEngineObj engine);
        PetriNetsEngineObj engine;
        virtual void initialize() = 0;
};

#endif