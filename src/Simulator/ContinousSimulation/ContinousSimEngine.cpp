#include "ContinousSimEngine.hpp"

void ContinousSimEngine::init(double endTime, double stepSize)
{
    if (stepSize <= 0)
        throw "Step cannot be smaller then zero";

    if (endTime <= 0)
        throw "endTime cannost be smaller than zero";

    this->_stepSize = stepSize;
    this->_endTime = endTime;
}

void ContinousSimEngine::simulate()
{
    int cnt = 0;
    this->simulationBegin();
    while(this->time() <= this->endTime())
    {
        if (cnt % 10 == 0)
            this->Sample(); // TODO odstranit

        this->simStep(); // krok simulace
        cnt ++;
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
    return;
}

void ContinousSimEngine::addContSimObject(ContinousSimObject *object)
{
    this->_objects.push_back(object);
}