#include "DiscreteSimulationEngine.hpp"



void DiscreteSimulationEngine::init(float endTime, vector<SimObject*> &objects)
{  
    this->_endTime = endTime;

    Global::calendar = this->calendar;
    Global::simObjects = make_shared<vector<SimObject*>>(objects);
    Global::generator = shared_ptr<Generator>(new Generator());
    
    for (auto& obj : objects)
    {
        obj->initialize();
    }
}

void DiscreteSimulationEngine::simulate()
{
    auto time = 0;

    while(!calendar->isEmpty()){
        auto event = calendar->getNextEvent();
        if(event.time > this->_endTime){
            break;
        }
        time = event.time;
        event.func();
    }
    
    cout << "Simulation finished at time: " << time << endl;      
}