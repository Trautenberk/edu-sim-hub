#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject(shared_ptr<PetriNetsEngine> engine) : DiscreteSimObject()
{
    this->engine = engine;
    this->engine->simObjects.push_back(this);
}