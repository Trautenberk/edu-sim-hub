#ifndef DiscreteEngine_H
#define DiscreteEngine_H

#include "Calendar.hpp"
#include <vector>
#include <iostream>
#include <memory>
#include <ctime>
#include "../SimEngine.hpp"

using namespace std;

class DiscreteEngine : public SimEngine {
    public:
        void init(float endTime, int maxIteration = 1000);
        virtual void simulate() override;
        virtual void simulationBegin() override;
        virtual void simulationEnd() override;
        virtual void updateTime(double nextEventTime);
        virtual void processEvent(Event& event);
        virtual void gatherStatistics() = 0;

        Calendar calendar = Calendar();

    private:
        int _maxIteration;
        int _iteration;
};

#endif