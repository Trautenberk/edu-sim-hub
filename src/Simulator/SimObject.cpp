#include "SimObject.hpp"


int SimObject::_objCounter = 0;

SimObject::SimObject()
{   
    this->id = this->getObjType() + "_" + to_string(_objCounter++);
}

string SimObject::getObjType()
{
    return "SimObject";
}

void SimObject::initialize()
{
    return;    
}