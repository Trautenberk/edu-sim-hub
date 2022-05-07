#include "PetriNetsObject.hpp"
#include "../SimEngine.hpp"

PetriNetsObject::PetriNetsObject(objectId id, PetriNetsEngineObj _engine) 
: SimObject(id), engine(_engine) 
{
    engine->addObject(this);
}