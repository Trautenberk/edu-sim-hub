#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include "../SimObject.hpp"
#include <vector>
#include <iostream>
#include "Global.hpp"
#include <memory>
#include "Generator.hpp"
#include "../PetriNets/Transition.hpp"

using namespace std;
class Transition;


class DiscreteEngine {
    public:
        DiscreteEngine();
        void init(float endTime, vector<shared_ptr<SimObject>> &objects, int maxIteration = 1000);
        void simulate();
        int maxIteration;
        int iteration;
        Calendar calendar = Calendar();
        Generator generator = Generator();
        float endTime;
        float time = 0;
        vector<shared_ptr<SimObject>> simObjects = {}; 
        vector<shared_ptr<Transition>> allTransitions = {};
};

#endif