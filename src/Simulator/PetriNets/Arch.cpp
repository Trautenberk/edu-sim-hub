#include "Arch.hpp"

using namespace std;

Arch::Arch(shared_ptr<Place> targetPlace, int weight) : PetriNetsObject()
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
}


string Arch::getObjType()
{
    return "Arch";
}

/// InputArch
InputArch::InputArch(shared_ptr<Place> targetPlace, int weight) : Arch(targetPlace, weight)
{}

void InputArch::execute()
{
    this->targetPlace->removeTokens(this->_weight);    
}

// kolikrat je prechod uspokojen
int InputArch::satisfied() 
{
    return this->targetPlace->tokens() / _weight;
}

/// OutpuArch
OutputArch::OutputArch(shared_ptr<Place> targetPlace, int weight) : Arch(targetPlace, weight)
{}

void OutputArch::execute()
{
    this->targetPlace->addTokens(this->_weight);
}
