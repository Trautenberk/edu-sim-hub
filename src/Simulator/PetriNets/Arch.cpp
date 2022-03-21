#include "Arch.hpp"

using namespace std;

Arch::Arch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight) : PetriNetsObject(engine)
{
    if (weight < 1) {
        cerr << "Error: cannot initialize arch with weight smaller than one" << endl;
        throw new exception();
    }
    
    this->targetPlace = targetPlace;
    this->_weight = weight;
}

/// InputArch
InputArch::InputArch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight) : Arch(engine, targetPlace, weight)
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
OutputArch::OutputArch(shared_ptr<PetriNetsEngine> engine, shared_ptr<Place> targetPlace, int weight) : Arch(engine, targetPlace, weight)
{}

void OutputArch::execute()
{
    this->targetPlace->addTokens(this->_weight);
}
