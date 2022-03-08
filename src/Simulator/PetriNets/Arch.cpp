#include "Arch.hpp"
#include <iostream>

using namespace std;

Arch::Arch(Place* targetPlace, int weight) : SimObject()
{
    this->_weight = weight;
    this->_targetPlace = targetPlace;
}

Arch::~Arch()
{
}

string Arch::getObjType()
{
    return "Arch";
}

void InputArch::execute()
{
    this->_targetPlace->removeTokens(this->_weight);    
}

bool InputArch::satisfied() 
{
    return this->_targetPlace->tokens() >= _weight;
}

void OutputArch::execute()
{
    this->_targetPlace->addTokens(this->_weight);
}