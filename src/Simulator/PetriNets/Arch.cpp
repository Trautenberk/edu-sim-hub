#include "Arch.hpp"
#include <iostream>

using namespace std;

Arch::Arch(shared_ptr<Place> targetPlace, int weight) : SimObject()
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
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

InputArch::InputArch(shared_ptr<Place> targetPlace, int weight) : Arch(targetPlace, weight)
{}

void InputArch::execute()
{
    this->targetPlace->removeTokens(this->_weight);    
}

bool InputArch::satisfied() 
{
    return this->targetPlace->tokens() >= _weight;
}

OutputArch::OutputArch(shared_ptr<Place> targetPlace, int weight) : Arch(targetPlace, weight)
{}

void OutputArch::execute()
{
    this->targetPlace->addTokens(this->_weight);
}