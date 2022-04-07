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
        void gatherStatistics();

        int maxIteration;
        int iteration;
        Calendar calendar = Calendar();
        Generator generator = Generator();
        float endTime;
        void time(double time);
        const double time() const;
        vector<DiscreteSimObject*> simObjects = {};
    private:
        double _time = 0;
};

#endif