#include "Arch.hpp"
#include <iostream>

using namespace std;

Arch::Arch(ArchType archType, int weight, Place& targetPlace) : SimObject()
{
    this->_weight = weight;
    this->_targetPlace = targetPlace;
    this->_archType = archType;
}

Arch::~Arch()
{
}

string Arch::getObjType()
{
    return "Arch";
}

void Arch::execute()
{
    if (this->archType() == ArchType::input) {
        this->_targetPlace.addTokens(this->_weight);
    } else {
        this->_targetPlace.removeTokens(this->_weight);
    }
}