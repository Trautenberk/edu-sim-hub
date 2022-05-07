#include "DiscreteEngine.hpp"
#include "../SimObject.hpp"

void DiscreteEngine::init(float endTime, int maxIteration)
{  
    this->_endTime = endTime;
    this->_time = 0;
    this->_maxIteration = maxIteration;
    this->_iteration = 0;
    

    for (auto& obj : this->_simObjects)
    {
        obj->initialize();
    }

}

void DiscreteEngine::simulate()
{
    auto beginSimTime = std::clock();

    while(!calendar.isEmpty() && this->_iteration <= this->_maxIteration) 
    {
        auto event = calendar.getNextEvent();
        if(event.time > this->_endTime){
            break;
        }                                   // TODO prepsat do metod

        this->updateTime(event.time); // posun času
        this->processEvent(event);
    }
    this->gatherStatistics();

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

