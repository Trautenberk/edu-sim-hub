#include "SimEngine.hpp"
#include <memory>
#include "SimObject.hpp"



double SimEngine::time()
{
    return this->_time;
}

double SimEngine::endTime()
{
    return this->_endTime;
}

void SimEngine::addObject(SimObject* object)
{
    this->_simObjects.push_back(object);
}


#ifdef EMSCRIPTEN
    EMSCRIPTEN_BINDINGS(SimEngine) {
    }

#endif