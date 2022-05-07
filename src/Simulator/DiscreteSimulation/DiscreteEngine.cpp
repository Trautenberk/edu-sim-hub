#include "DiscreteEngine.hpp"
#include "../SimObject.hpp"

// Inicializace enginu
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

    // Dokud je kalendář neprázdný nebo nebyl překročen maximální počet iterací bez změny modelového času
    while(!calendar.isEmpty() && this->_iteration <= this->_maxIteration)
    {
        auto event = calendar.getNextEvent();   // vezme v pořadí další záznam z kalendáře
        if(event.time > this->_endTime){    // pokud je aktivační čas za hranicí koncového času
            break;                          // konec
        }

        this->updateTime(event.time); // posun času
        this->processEvent(event);  // zpracování eventu
    }
    this->gatherStatistics(); // sběr statistik po konci simulace

    auto endSimTime = std::clock();
    // cout << "Simulation finished at model time: " << this->_time << ", simulation duration: " << double(endSimTime - beginSimTime) / CLOCKS_PER_SEC << "s" << endl;
}


void DiscreteEngine::updateTime(double nextEventTime)
{
    if (this->_time < nextEventTime)
    {
        // std::cout << "Detekce zmeny casu" << std::endl;
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

