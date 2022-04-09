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

    while(this->time() <= this->endTime())
    {
        this->simStep(); // krok simulace
        if (cnt % 10 == 0)
            this->Sample();
        cnt ++;
    } 
}

double ContinousSimEngine::time()
{
    return this->_time;
}

double ContinousSimEngine::endTime()
{
    return this->_endTime;
}

double ContinousSimEngine::stepSize()
{
    return this->_stepSize;
}

const double & ContinousSimEngine::timeRef()
{
    return this->_time;
}