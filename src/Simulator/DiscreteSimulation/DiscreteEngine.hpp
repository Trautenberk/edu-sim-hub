#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include "DiscreteSimObject.hpp"
#include <vector>
#include <iostream>
#include <memory>
#include "../Generator/Generator.hpp"
#include <ctime>
#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

class DiscreteEngine {
    public:
        DiscreteEngine();
        void init(float endTime, int maxIteration = 1000);
        void simulate();
        void clear();

        int maxIteration;
        int iteration;
        Calendar calendar = Calendar();
        Generator generator = Generator();
        float endTime;
        float time = 0;
        vector<DiscreteSimObject*> simObjects = {}; 
};

#endif