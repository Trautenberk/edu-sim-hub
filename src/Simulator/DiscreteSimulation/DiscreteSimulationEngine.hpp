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
        DiscreteSimulationEngine();
        void init(float endTime, vector<shared_ptr<SimObject>> &objects, int maxIteration = 1000);
        void simulate();
        int maxIteration;
        int iteration;
        Calendar calendar = Calendar();
        Generator generator = Generator();
        float endTime;
        vector<shared_ptr<SimObject>> simObjects = {}; 
        vector<shared_ptr<Transition>> allTransitions = {};
};

#endif