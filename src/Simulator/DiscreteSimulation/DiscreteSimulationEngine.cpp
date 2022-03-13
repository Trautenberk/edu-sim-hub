#include "DiscreteSimulationEngine.hpp"

DiscreteSimulationEngine::DiscreteSimulationEngine()
{}

void DiscreteSimulationEngine::init(float endTime, vector<SimObject*> &objects, int maxIteration)
{  
    Global::discreteSimEngine = this;

    this->endTime = endTime;
    this->maxIteration = maxIteration;
    this->iteration = 0;
    this->simObjects = vector<SimObject*>(objects);
    
    for (auto& obj : this->simObjects)
    {
        obj->initialize();
    }
}

void DiscreteSimulationEngine::simulate()
{
    auto time = 0;

    while(!calendar.isEmpty() && this->iteration <= this->maxIteration){
        auto event = calendar.getNextEvent();
        if(event->time > this->endTime){
            break;
        }
        time = event->time;
        event->func();
        this->iteration++;
    }
    
    cout << "Simulation finished at time: " << time << endl;      
}