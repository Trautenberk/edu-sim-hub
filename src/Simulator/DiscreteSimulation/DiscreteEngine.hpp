#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include "DiscreteSimObject.hpp"
#include <vector>
#include <iostream>
#include <memory>
#include "../Generator/Generator.hpp"
#include <ctime>
#include "../SimEngine.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif

using namespace std;

class DiscreteEngine : public SimEngine {
    public:
        void init(float endTime, int maxIteration = 1000);
        virtual void simulate();
        virtual void simulationBegin();
        virtual void simulationEnd();
        void addDiscreteObject(DiscreteSimObject* object);
        virtual void updateTime(double nextEventTime);
        virtual void processEvent(Event& event);
        virtual void gatherStatistics() = 0;

        Calendar calendar = Calendar();
        Generator generator = Generator();
    
    private:
        int _maxIteration;
        int _iteration;
        vector<DiscreteSimObject*> _simObjects = {};

};

#endif