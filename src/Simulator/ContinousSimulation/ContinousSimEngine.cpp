#include "ContinousSimEngine.hpp"
#include <iostream>


bool ContinousSimEngine::init(double endTime, double stepSize, int sampleRate)
{
    if (stepSize <= 0) 
    {
        std::cerr << "Step cannot be smaller then zero" << std::endl;
        return false;
    }

    if (endTime <= 0)
    {
        std::cerr <<  "endTime cannost be smaller than zero" << std::endl;
        return false;
    }
    
    if (sampleRate <= 0)
    {
        std::cerr << "sampleRate cannot be smaller than zero" << std::endl;
        return false;
    }

    try 
    {
        for(auto obj : this->_objects)
        {
            obj->initialize();
        }
    } 
    catch(exception e)
    {
        return false;
    }

    this->_stepSize = stepSize;
    this->_endTime = endTime;
    this->_sampleRate = sampleRate;

    return this->_initializedCorrectly = true;
}

void ContinousSimEngine::simulate()
{
    if (!this->_initializedCorrectly) 
    {
        std::cerr << "Cannot simulate, there was an error during initialization" << std::endl;
        return;
    }

    std::cout << "Cont sim begin" << std::endl;
    int cnt = 0;
    this->simulationBegin();
    while(this->time() <= this->endTime())
    {
        this->statisticsStep(); // sber statistik
        this->simStep(); // krok simulace
    }
    std::cout << "Cont sim end" << std::endl;
    this->simulationEnd(); 
}

double ContinousSimEngine::stepSize()
{
    return this->_stepSize;
}

void ContinousSimEngine::simulationBegin()
{
    return;
}

void ContinousSimEngine::simulationEnd()
{
    this->gatherStatistics();
}

void ContinousSimEngine::addContSimObject(ContinousSimObject *object)
{
    this->_objects.push_back(object);
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

