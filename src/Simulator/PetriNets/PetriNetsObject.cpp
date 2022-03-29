#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject(shared_ptr<PetriNetsEngine> engine, string auxName) : DiscreteSimObject()
{
    this->engine = engine;
    this->engine->simObjects.push_back(this);
    this->_auxName = auxName;
}