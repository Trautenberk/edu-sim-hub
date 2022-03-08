#include "Transition.hpp"

Transition::Transition(string label, vector<InputArch*> inputArches, vector<OutputArch*> outputArches) : SimObject()
{
    this->_label;
    this->inputArches = inputArches;
}

Transition::~Transition()
{
}

string Transition::getObjType()
{
    return "Transition";
}