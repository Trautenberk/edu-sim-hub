#include "Place.hpp"
#include <iostream>

Place::Place(string label, int tokens) : SimObject()
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
        throw new exception();
    }
}

string Place::getObjType()
{
    return "Place";
}