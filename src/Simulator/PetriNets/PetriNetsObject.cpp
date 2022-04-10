#include "PetriNetsObject.hpp"

PetriNetsObject::PetriNetsObject(shared_ptr<PetriNetsEngine> engine, string auxName) : DiscreteSimObject()
{
    this->engine = engine;
    this->engine->addDiscreteObject(this);  // TODO je tohle to spravne misto?
    this->_auxName = auxName;
}