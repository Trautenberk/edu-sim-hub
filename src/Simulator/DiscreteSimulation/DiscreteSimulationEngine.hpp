#ifndef DISCRETESIMULATIONENGINE_H
#define DISCRETESIMULATIONENGINE_H

#include "Calendar.hpp"
#include "../SimObject.hpp"
#include <vector>

using namespace std;

class DiscreteSimulationEngine {
    public:
        vector<SimObject> state = vector<SimObject>();
        void init(float beginTime,float endTime);
        void simulate();
        DiscreteSimulationEngine();
    private:
        float _beginTime;
        float _endTime;
};

#endif