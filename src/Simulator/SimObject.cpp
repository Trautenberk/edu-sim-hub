#include "SimObject.hpp"

int SimObject::_objCounter = 0;

SimObject::SimObject() : _id(_objCounter++)
{}

string SimObject::objTypeName()
{
    return "SimObject";
}