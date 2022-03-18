#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject() : SimObject()
{
    this->engine = &PetriNetsEngine::getInstance();
    this->engine->simObjects.push_back(this);
}