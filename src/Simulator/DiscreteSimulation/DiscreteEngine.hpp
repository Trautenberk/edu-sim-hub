#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include "../SimObject.hpp"
#include <vector>
#include <iostream>
#include <memory>
#include "Generator.hpp"

using namespace std;

class DiscreteEngine {
    public:
        static DiscreteEngine& getInstance()
        {
            static DiscreteEngine instance;
            return instance;
        }

        void init(float endTime, int maxIteration = 1000);
        void simulate();
        int maxIteration;
        int iteration;
        Calendar calendar = Calendar();
        Generator generator = Generator();
        float endTime;
        float time = 0;
        vector<SimObject*> simObjects = {}; 
    protected:
        DiscreteEngine() = default;
        DiscreteEngine(DiscreteEngine const&) = delete;
        void operator=(DiscreteEngine const&) = delete;
};

#endif