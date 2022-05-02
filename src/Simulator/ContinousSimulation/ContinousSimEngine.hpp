#ifndef CONTSIMULATOR_H
#define CONTSIMULATOR_H

#include <vector>
#include "ContinousSimObject.hpp"
#include "../SimEngine.hpp"

#ifdef EMSCRIPTEN
    #include <emscripten/bind.h>
#endif
using namespace std;


class ContinousSimEngine : public SimEngine {
    public:
        bool init(double beginTime, double endTime, double stepSize, int sampleRate = 1);
        virtual void simStep() = 0;   // krok simulace
        void simulate() override;
        virtual void simulationBegin() override;
        virtual void simulationEnd() override;
        void addContSimObject(ContinousSimObject* object);
        virtual void gatherStatistics() = 0;
        void statisticsStep();
        double stepSize();

    protected:
        vector<ContinousSimObject*> _objects = {};
        double _stepSize = -1;
        int _sampleRate = 1;     // kolikaty kazdy krok se ma zaznamenat
        int _sampleStep = 0;
        bool _initializedCorrectly = false;
};

#endif