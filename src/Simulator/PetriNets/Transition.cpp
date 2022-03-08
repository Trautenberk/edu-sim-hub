#include "Transition.hpp"

Transition::Transition(string label, vector<InputArch*> inputArches, vector<OutputArch*> outputArches) : SimObject()
{
    this->_label;
    this->inputArches = inputArches;
}

Transition::Transition(string label, InputArch* inputArch, OutputArch* outputArch) : SimObject()
{
    this->_label = label;
    this->inputArches = {inputArch};
    this->outputArches = {outputArch};
}

Transition::~Transition()
{
}

string Transition::getObjType()
{
    return "Transition";
}

void Transition::initialize()
{
    cout << "Initialize transition" << endl;
    return;
}