#ifndef DISCRETESIMULATIONENGINE_H
#define DISCRETESIMULATIONENGINE_H

#include "Calendar.hpp"
#include "../SimObject.hpp"
#include <vector>
#include <iostream>
#include "Global.hpp"
#include <memory>
#include "Generator.hpp"

using namespace std;

class DiscreteSimulationEngine {
    public:
        void init(float endTime, vector<SimObject*> &objects);
        void simulate();
        shared_ptr<Calendar> calendar = shared_ptr<Calendar>(new Calendar());

    private:
        float _endTime;
        shared_ptr<vector<SimObject*>> _simObjects;
};

#endif