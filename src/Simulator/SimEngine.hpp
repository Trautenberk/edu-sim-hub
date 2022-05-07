#ifndef __SIMENGINE_H__
#define __SIMENGINE_H__

#include <functional>
#include <vector>
#include <memory>

#ifdef EMSCRIPTEN
    #include "emscripten/bind.h"
#endif

class SimObject;
class SimEngine;


using SimEngineObj = std::shared_ptr<SimEngine>;


class SimEngine {
    public:
        double time();
        double endTime();
        virtual void simulate() = 0;
        virtual void simulationBegin() = 0;
        virtual void simulationEnd() = 0;
        void addObject(SimObject* object);
        std::function<void(void)> Sample = [](){};


    protected:
        double _endTime = 0.0;
        double _time = 0.0;
        std::vector<SimObject*> _simObjects = {};



};

#endif // __SIMENGINE_H__