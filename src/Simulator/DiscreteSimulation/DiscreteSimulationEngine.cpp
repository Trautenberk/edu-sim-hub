#include "DiscreteSimulationEngine.hpp"



void DiscreteSimulationEngine::init(float beginTime, float endTime, vector<SimObject*> &objects)
{  
    this->_beginTime = beginTime;
    this->_endTime = endTime;

    Global::calendar = this->calendar;
    Global::simObjects = make_shared<vector<SimObject*>>(objects);

    for (auto& obj : objects)
    {
        obj->initialize();
    }
}

void DiscreteSimulationEngine::simulate()
{
    auto time = this->_beginTime;

    while(!calendar->isEmpty()){
        auto event = calendar->getNextEvent();
        if(event.time > this->_endTime){
            break;
        }
        time = event.time;
        event.func();
    }
    
    cout << "Simulation end at time: " << time << endl;      
}void initialize();