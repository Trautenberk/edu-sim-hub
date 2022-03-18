#include "Place.hpp"
#include <iostream>

Place::Place(string label, int tokens) : PetriNetsObject()
{
    this->_label = label;
    this->_tokens = tokens; 
}

void Place::addTokens(int cnt)
{
    this->_tokens += cnt;  
}

void Place::removeTokens(int cnt)
{
    if (this->_tokens - cnt < 0)
    {
        cerr << "Cannot remove more tokens then there is present, Place Id: " << this->id << endl;
        throw "Cannot remove more tokens then there is present";
    }
    this->_tokens -= cnt;
}

string Place::getObjType()
{
    return "Place";
}