#include "SimObject.hpp"


int SimObject::_objCounter = 0;

string SimObject::getObjType()
{
    return "SimObject";
}

SimObject::SimObject()
{   
    this->id = this->getObjType() + "_" + to_string(_objCounter++);
}