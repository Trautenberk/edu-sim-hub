#ifndef PETRI_NETS_OBJECTS_H
#define PETRI_NETS_OBJECTS_H

#include "../DiscreteSimulation/DiscreteSimObject.hpp"
#include "PetriNetsEngine.hpp"


class PetriNetsObject : public DiscreteSimObject {
    public:
        PetriNetsObject(PetriNetsEngineObj engine, string auxName = "");
        PetriNetsEngineObj engine;
        virtual void initialize() = 0;
        string auxName() {return _auxName;};
    private:
        string _auxName = "";
};

#endif