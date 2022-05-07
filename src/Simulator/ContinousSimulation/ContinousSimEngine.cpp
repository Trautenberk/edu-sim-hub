#include "ContinousSimEngine.hpp"
#include <iostream>
#include "../SimObject.hpp"

// Inicializační metoda
bool ContinousSimEngine::init(double beginTime,double endTime, double stepSize, int sampleRate)
{
    if (stepSize <= 0.0) // kontrola délky kroku
    {
        std::cerr << "Step cannot be smaller then zero" << std::endl;
        return false;
    }

    if (endTime <= beginTime)   // Kontrola hranic modelového času
    {
        std::cerr <<  "endTime cannost be smaller than beginTime" << std::endl;
        return false;
    }
    
    if (sampleRate <= 0)    // Kontrol intervalu sběru statistik
    {
        std::cerr << "sampleRate cannot be smaller than zero" << std::endl;
        return false;
    }

    try 
    {   
        // Provede inicializaci všech objektů modelu
        for(auto obj : this->_simObjects)
        {
            obj->initialize();
        }
    } 
    catch(exception e)
    {
        return false;
    }

    this->_stepSize = stepSize;
    this->_time = beginTime;
    this->_endTime = endTime;
    this->_sampleRate = sampleRate;

    return this->_initializedCorrectly = true;
}

// Metoda provedení simulace
void ContinousSimEngine::simulate()
{
    if (!this->_initializedCorrectly) 
    {
        std::cerr << "Cannot simulate, there was an error during initialization" << std::endl;
        return;
    }

    int cnt = 0;
    while(this->time() <= this->endTime())
    {
        this->statisticsStep(); // sběr statistik
        this->simStep(); // krok simulace
        
        if(this->_time + this->_stepSize > this->_endTime)  // krok by byl u za koncový čas
        {
            this->_stepSize = this->_endTime - this->_time; // dokročení
            this->statisticsStep(); // sber statistik
            this->simStep(); // krok simulace
            break;
        } 
        else
        {
            this->_time += this->_stepSize;   // inkrementace casu o délku kroku
        }
    }
    this->gatherStatistics();
}

double ContinousSimEngine::stepSize()
{
    return this->_stepSize;
}

void ContinousSimEngine::statisticsStep()
{
    if (this->_sampleStep % this->_sampleRate == 0) 
    {
        this->gatherStatistics();
        this->Sample();
    }

    this->_sampleStep++;
}

