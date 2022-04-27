#ifndef __SIMENGINE_H__
#define __SIMENGINE_H__

#include <functional>

#ifdef EMSCRIPTEN
    #include "emscripten/bind.h"
#endif

class SimEngine {
    public:
        double time();
        double endTime();
        virtual void simulate() = 0;
        virtual void simulationBegin() = 0;
        virtual void simulationEnd() = 0;
        std::function<void(void)> Sample = [](){};

    protected:
        double _endTime = 0.0;
        double _time = 0.0;

};
#endif // __SIMENGINE_H__