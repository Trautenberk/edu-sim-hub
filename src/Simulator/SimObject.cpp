#include "SimObject.hpp"

int SimObject::_objCounter = 0;

SimObject::SimObject(string id) 
{
    this->_id = id;
}

const objectId SimObject::id() { return this->_id; };

string SimObject::createId(string objectType)
{
    return objectType + "_" + std::to_string(_objCounter++);
} 

