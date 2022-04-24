#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject(objectId id, PetriNetsEngineObj _engine) 
: DiscreteSimObject(id), engine(_engine) 
{
    this->engine->addDiscreteObject(this);  // TODO je tohle to spravne misto?
}