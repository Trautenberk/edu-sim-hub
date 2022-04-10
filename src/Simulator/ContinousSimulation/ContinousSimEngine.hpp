#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "ContinousSimObject.hpp"
#include "../SimEngine.hpp"

using namespace std;

class ContinousSimEngine : public SimEngine {
    public:
        void init(double endTime, double stepSize);
        virtual void simStep() = 0;   // krok simulace
        void simulate();

        double stepSize();
        function<void(void)> Sample = [](){};

    protected:
        vector<ContinousSimObject*> _objects = {};
        double _stepSize = -1;

};

#endif