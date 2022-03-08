#include "Arch.hpp"
#include <iostream>

using namespace std;

Arch::Arch(Place* targetPlace, int weight) : SimObject()
{
    this->_weight = weight;
    this->_targetPlace = targetPlace;
}

Arch::~Arch()
{}

string Arch::getObjType()
{
    return "Arch";
}

void Arch::execute()
{
    return;
}

void Arch::initialize()
{
    return;
}

InputArch::InputArch(Place* targetPlace, int weight) : Arch(targetPlace, weight)
{}

void InputArch::execute()
{
    this->_targetPlace->removeTokens(this->_weight);    
}

bool InputArch::satisfied() 
{
    return this->_targetPlace->tokens() >= _weight;
}

OutputArch::OutputArch(Place* targetPlace, int weight) : Arch(targetPlace, weight)
{}

void OutputArch::execute()
{
    this->_targetPlace->addTokens(this->_weight);
}