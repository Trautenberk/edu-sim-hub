#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "ContinousSimObject.hpp"

using namespace std;

class ContinousSimEngine {
    public:
        void init(float endTime, float step);
        void simulate();
        float endTime;
        float step;
        float time = 0;
        vector<ContinousSimObject*> objects = {};
};

#endif