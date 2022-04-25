#include "ContinousSimEngine.hpp"

void ContinousSimEngine::init(double endTime, double stepSize, int sampleRate)
{
    if (stepSize <= 0)
        throw "Step cannot be smaller then zero";

    if (endTime <= 0)
        throw "endTime cannost be smaller than zero";
    
    if (sampleRate <= 0)
        throw "sampleRate cannot be smaller than zero";

    this->_stepSize = stepSize;
    this->_endTime = endTime;
    this->_sampleRate = sampleRate;
}

void ContinousSimEngine::simulate()
{
    int cnt = 0;
    this->simulationBegin();
    while(this->time() <= this->endTime())
    {
        this->statisticsStep(); // sber statistik
        this->simStep(); // krok simulace
    }
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

#ifdef EMSCRIPTEN
    #include "emscripten/bind.h"
    EMSCRIPTEN_BINDINGS(ContinousSimEngine) {
        emscripten::class_<ContinousSimEngine>("ContinousSimEngine")
        .function("init", &ContinousSimEngine::init)
        .function("simulate", &ContinousSimEngine::simulate);
    }
#endif