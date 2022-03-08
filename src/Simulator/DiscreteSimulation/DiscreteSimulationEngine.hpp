#ifndef DISCRETESIMULATIONENGINE_H
#define DISCRETESIMULATIONENGINE_H

#include "Calendar.hpp"
#include "../SimObject.hpp"
#include <vector>
#include <iostream>

using namespace std;

class DiscreteSimulationEngine {
    public:
        void init(float beginTime,float endTime, vector<SimObject*> objects);
        void simulate();
        Calendar* calendar = new Calendar();

    private:
        float _beginTime;
        float _endTime;
};

#endif