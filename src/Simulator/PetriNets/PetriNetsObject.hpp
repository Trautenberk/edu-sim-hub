#ifndef PETRI_NETS_OBJECTS_H
#define PETRI_NETS_OBJECTS_H

#include "../DiscreteSimulation/DiscreteSimObject.hpp"
#include "PetriNetsEngine.hpp"

class PetriNetsEngine;

class PetriNetsObject : public DiscreteSimObject {
    public:
        PetriNetsObject(shared_ptr<PetriNetsEngine> engine);
        shared_ptr<PetriNetsEngine> engine;
        virtual string getObjType() = 0;
        virtual void initialize() = 0;
};

#endif