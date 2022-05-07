#include "SimObject.hpp"
#include "SimEngine.hpp"

int SimObject::_objCounter = 0;

SimObject::SimObject(objectId id) 
{
    this->_id = id;
}

const objectId SimObject::id() { return this->_id; };

std::string SimObject::createId(std::string objectType)
{
    return objectType + "_" + std::to_string(_objCounter++);
} 

