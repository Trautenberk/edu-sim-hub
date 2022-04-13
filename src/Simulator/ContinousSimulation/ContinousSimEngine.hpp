#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "ContinousSimObject.hpp"
#include "../SimEngine.hpp"

using namespace std;

class ContinousSimEngine : public SimEngine {
    public:
        void init(double endTime, double stepSize, int sampleRate = 1);
        virtual void simStep() = 0;   // krok simulace
        void simulate();
        virtual void simulationBegin() override;
        virtual void simulationEnd() override;
        void addContSimObject(ContinousSimObject* object);
        virtual void gatherStatistics() = 0;
        void statisticsStep();

        double stepSize();
        function<void(void)> Sample = [](){};

    protected:
        vector<ContinousSimObject*> _objects = {};
        double _stepSize = -1;
        int _sampleRate = 1;     // kolikaty kazdy krok se ma zaznamenat
        int _sampleStep = 0;

};

#endif