#include "DiscreteEngine.hpp"

void DiscreteEngine::init(float endTime, int maxIteration)
{  
    this->endTime = endTime;
    this->time = 0;
    this->maxIteration = maxIteration;
    this->iteration = 0;
    
    for (auto& obj : this->simObjects)
    {
        obj->initialize();
    }
}

void DiscreteEngine::simulate()
{
    this->time = 0;

    while(!calendar.isEmpty() && this->iteration <= this->maxIteration){
        auto event = calendar.getNextEvent();
        if(event.time > this->endTime){
            break;
        }
        this->time = event.time;
        event.func(event.id);
        this->iteration++;
    }
    
    cout << "Simulation finished at time: " << time << endl;

}

void DiscreteEngine::clear()
{
    this->calendar.clear();
    this->endTime = 0;
    this->time = 0;
    this->simObjects = {};
    this->iteration = 0;
}