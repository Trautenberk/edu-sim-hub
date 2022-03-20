#include "ContinousSimulator.hpp"

void ContinousSimulator::init(float endTime, float step)
{
    if (step <= 0)
        throw "Step cannot be smaller then zero";

    if (endTime <= 0)
        throw "endTime cannost be smaller than zero";
    
    this->endTime = endTime;
    this->step = step;
}

void ContinousSimulator::simulate()
{
    while(this->time <= this->endTime)
    {
        // TODO tady nevim
        
        this->time += this->step; 
    } 
}