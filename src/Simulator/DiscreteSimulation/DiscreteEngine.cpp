#include "DiscreteEngine.hpp"
#include "../SimObject.hpp"

void DiscreteEngine::init(float endTime, int maxIteration)
{  
    this->_endTime = endTime;
    this->_time = 0;
    this->_maxIteration = maxIteration;
    this->_iteration = 0;
    
    cout << "Begin initialization..." << endl;
    for (auto& obj : this->_simObjects)
    {
        // cout << "initializing object: " << obj->name() << endl;
        obj->initialize();
        // cout << "object init finished" << endl;
    }
    cout << "Initialization completed..." << endl;
}

void DiscreteEngine::simulate()
{
    cout << "Simulation begin" << endl;
    cout << "Total SimObject count:" << this->_simObjects.size() << endl;
    auto beginSimTime = std::clock();

    this->simulationBegin();
    while(!calendar.isEmpty() && this->_iteration <= this->_maxIteration) 
    {
        auto event = calendar.getNextEvent();
        if(event.time > this->_endTime){
            break;
        }                                   // TODO prepsat do metod

        this->updateTime(event.time); // posun času
        this->processEvent(event);
    }
    this->simulationEnd();
    auto endSimTime = std::clock();
    cout << "Simulation finished at model time: " << this->_time << ", simulation duration: " << double(endSimTime - beginSimTime) / CLOCKS_PER_SEC << "s" << endl;
}


void DiscreteEngine::updateTime(double nextEventTime)
{
    if (this->_time < nextEventTime)
    {
        std::cout << "Detekce zmeny casu" << std::endl;
        this->gatherStatistics(); // pokud dojde k posunu casu, sesbirej statistiky
        this->Sample();
        this->_iteration = 0;   // vynuluju 
    } 
    else    // nedošlo k posunu
    {
        this->_iteration++;
    }       
    
    this->_time = nextEventTime;
} 

void DiscreteEngine::processEvent(Event &event)
{
    event.func(event.id);   // provedení eventu
}

void DiscreteEngine::simulationBegin()
{
    return;
}

void DiscreteEngine::simulationEnd()
{
    this->gatherStatistics();
}
