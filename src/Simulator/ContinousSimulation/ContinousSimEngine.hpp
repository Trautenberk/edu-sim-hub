#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "ContinousSimObject.hpp"

using namespace std;

class ContinousSimEngine {
    public:
        void init(double endTime, double stepSize);
        virtual void simStep() = 0;   // krok simulace
        void simulate();

        double endTime();
        double stepSize();
        double time();
        const double & timeRef();
        function<void(void)> Sample = [](){};

    protected:
        vector<ContinousSimObject*> _objects = {};
        double _endTime = 0.0;
        double _stepSize = -1;
        int iteration = 0;
        double _time = 0.0;      // TODO cas by se dal vytahnout do spolecneho predka pro oba engine

};

#endif