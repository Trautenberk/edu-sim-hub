#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject(shared_ptr<PetriNetsEngine> engine) : SimObject()
{
    this->engine = engine;
    this->engine->simObjects.push_back(this);
}